<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPermohonan\StoreRequest;
use App\Http\Requests\DataPermohonan\UpdateRequest;
use App\Models\DataPermohonan;
use App\Models\Partai;
use App\Models\User;
use App\Models\VerifikasiDataPermohonan;
use Illuminate\Http\Request;
use App\Services\FonnteService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\Storage;

class DataPermohonanController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->roles->first()?->name;
        $verifikatorStep = null;

        if ($role && str_starts_with($role, 'verifikator-')) {
            $verifikatorStep = (int) str_replace('verifikator-', '', $role);
        }

        $query = DataPermohonan::with('user', 'partai');

        if ($verifikatorStep !== null) {
            if ($verifikatorStep === 1) {
                $query->whereDoesntHave('verifikasi');
            } else {
                $query->whereHas('verifikasi', function ($q) use ($verifikatorStep) {
                    $q->select('data_permohonan_id')
                    ->groupBy('data_permohonan_id')
                    ->havingRaw('COUNT(*) = ?', [$verifikatorStep - 1]);
                })->whereDoesntHave('verifikasi', function ($q) use ($verifikatorStep) {
                    $q->select('data_permohonan_id')
                    ->groupBy('data_permohonan_id')
                    ->havingRaw('COUNT(*) >= ?', [$verifikatorStep]);
                });
            }

            $query->where('status', '!=', 'ditolak');

        } else {
            $query->where('user_id', $user->id);
        }

        $daftarDataPermohonan = $query->paginate(10);

        $dataPermohonanUser = DataPermohonan::where('user_id', $user->id)->get();

        $notifikasi = $dataPermohonanUser->map(function ($permohonan) {
            $jumlahVerifikasi = VerifikasiDataPermohonan::where('data_permohonan_id', $permohonan->id)->count();

            if ($permohonan->status === 'ditolak') {
                return [
                    'permohonan_id' => $permohonan->id,
                    'pesan' => "Data permohonan ID {$permohonan->id} ditolak. Alasan: {$permohonan->alasan_penolakan}",
                    'status' => $permohonan->status,
                    'alasan_penolakan' => $permohonan->alasan_penolakan,
                ];
            }

            if ($jumlahVerifikasi > 0) {
                return [
                    'permohonan_id' => $permohonan->id,
                    'pesan' => "Data permohonan ID {$permohonan->id} sudah diverifikasi oleh {$jumlahVerifikasi} verifikator.",
                    'status' => $permohonan->status,
                    'alasan_penolakan' => $permohonan->alasan_penolakan,
                ];
            }

            return null;
        })->filter()->values();

        return inertia('DataPermohonan/List', [
            'auth' => [
                'user' => $user,
            ],
            'dataPermohonan' => $daftarDataPermohonan,
            'notifikasi' => $notifikasi,
        ]);
    }

    public function laporan(Request $request)
    {
        $user = Auth::user();

        $searchTanggal = $request->input('search_tanggal');
        $searchNama = $request->input('search_nama');
        $filterBulan = $request->input('filter_bulan');
        $filterTahun = $request->input('filter_tahun');

        $dataTerverifikasiPenuh = DataPermohonan::with('user', 'partai')
            ->whereHas('verifikasi', function ($q) {
                $q->select('data_permohonan_id')
                    ->groupBy('data_permohonan_id')
                    ->havingRaw('COUNT(*) = 7');
            })
            ->when($searchNama, function ($query, $searchNama) {
                $query->whereHas('user', function ($q) use ($searchNama) {
                    $q->where('name', 'like', '%' . $searchNama . '%');
                });
            })
            ->when($searchTanggal, function ($query, $searchTanggal) {
                $query->where('tanggal_permohonan', 'like', '%' . $searchTanggal . '%');
            })
            ->when($filterBulan, function ($query, $filterBulan) {
                $query->whereMonth('tanggal_permohonan', $filterBulan);
            })
            ->when($filterTahun, function ($query, $filterTahun) {
                $query->whereYear('tanggal_permohonan', $filterTahun);
            })
            ->orderBy('tanggal_permohonan', 'desc')
            ->paginate(10)
            ->appends($request->only('search_nama', 'search_tanggal', 'filter_bulan', 'filter_tahun')); // agar pagination membawa filter

        return inertia('Laporan/List', [
            'auth' => [
                'user' => $user,
            ],
            'dataPermohonan' => $dataTerverifikasiPenuh,
            'filters' => [
                'search_nama' => $searchNama,
                'search_tanggal' => $searchTanggal,
                'filter_bulan' => $filterBulan,
                'filter_tahun' => $filterTahun,
            ]
        ]);
    }

    public function print($dataPermohonan)
    {
        $permohonan = DataPermohonan::with(['user', 'partai'])->findOrFail($dataPermohonan);
        $html = view('pdf.laporan', ['dataPermohonan' => [$permohonan]])->render();

        Browsershot::html($html)
            ->format('A4')
            ->margins(10, 10, 10, 10)
            ->waitUntilNetworkIdle()
            ->savePdf(storage_path("app/public/laporan-{$dataPermohonan}.pdf"));

        return response()->file(storage_path("app/public/laporan-{$dataPermohonan}.pdf"))->deleteFileAfterSend();
    }

    public function printAll()
    {
        $dataPermohonan = DataPermohonan::with(['user', 'partai'])
            ->whereHas('verifikasi', function ($q) {
                $q->select('data_permohonan_id')
                ->groupBy('data_permohonan_id')
                ->havingRaw('COUNT(*) = 7');
            })
            ->get();

        $html = view('pdf.daftarDataPermohonan', ['dataPermohonan' => $dataPermohonan])->render();

        $filename = 'laporan-terverifikasi-7-' . now()->format('YmdHis') . '.pdf';

        Browsershot::html($html)
            ->format('A4')
            ->margins(10, 10, 10, 10)
            ->waitUntilNetworkIdle()
            ->savePdf(storage_path("app/public/{$filename}"));

        return response()->file(storage_path("app/public/{$filename}"))->deleteFileAfterSend();
    }

    public function store(StoreRequest $request)
    {
        $suratPermohonanPath = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
        $suratDppPath = $request->file('surat_dpp')->store('surat_dpp', 'public');
        $suketPath = $request->file('suket')->store('suket', 'public');
        $rencanaPenggunaanPath = $request->file('rencana_penggunaan')->store('rencana_penggunaan', 'public');
        $realisasiPath = $request->file('realisasi')->store('realisasi', 'public');
        $suratPernyataanPath = $request->file('surat_pernyataan')->store('surat_pernyataan', 'public');

        DataPermohonan::create([
            'partai_id'=>$request->partai_id,
            'user_id'=>$request->user_id,
            'tanggal_permohonan'=>$request->tanggal_permohonan,
            'surat_permohonan'=>$suratPermohonanPath,
            'surat_dpp'=>$suratDppPath,
            'npwp'=>$request->npwp,
            'suket'=>$suketPath,
            'rekening'=>$request->rekening,
            'rencana_penggunaan'=>$rencanaPenggunaanPath,
            'realisasi'=>$realisasiPath,
            'surat_pernyataan'=>$suratPernyataanPath,
            'status'=>$request->status,
            'keterangan'=>$request->keterangan,
        ]);

        return redirect()->route('data-permohonan.index');
    }

    public function update(UpdateRequest $request, $dataPermohonan)
    {
        $permohonan = DataPermohonan::with('user')->findOrFail($dataPermohonan);
        $pemohon = $permohonan->user;

        $permohonan->status = $request->status;
        $permohonan->alasan_penolakan = $request->status === 'ditolak'
            ? $request->alasan_penolakan
            : null;

        $permohonan->save();

        if ($request->status === 'ditolak' && $request->filled('alasan_penolakan')) {
            $nomor = preg_replace('/[^0-9]/', '', $pemohon->kontak);
            if (str_starts_with($nomor, '0')) {
                $nomor = '62' . substr($nomor, 1);
            }

            $pesan = "Maaf *{$pemohon->name}*, permohonan bantuan dana Anda *DITOLAK*.\n\nAlasan: *{$request->alasan_penolakan}*.";

            $res = app(FonnteService::class)->send($nomor, $pesan);
            \Log::info('WA penolakan dikirim:', ['kontak' => $pemohon->kontak, 'respon' => $res]);
        }

        return redirect()->route('data-permohonan.index')->with('message', 'Data berhasil diperbarui.');
    }

    public function verifikasi($id)
    {
        $user = auth()->user();

        // Cek apakah sudah pernah memverifikasi
        $sudahVerifikasi = VerifikasiDataPermohonan::where('data_permohonan_id', $id)
            ->where('user_id', $user->id)
            ->exists();

        if ($sudahVerifikasi) {
            return back()->with('message', 'Anda sudah memverifikasi permohonan ini.');
        }

        // Simpan verifikasi
        VerifikasiDataPermohonan::create([
            'data_permohonan_id' => $id,
            'user_id' => $user->id,
        ]);

        // Ambil permohonan dan pemohon
        $permohonan = DataPermohonan::with('user')->findOrFail($id);
        $pemohon = $permohonan->user;
        $jumlahVerifikasi = VerifikasiDataPermohonan::where('data_permohonan_id', $id)->count();

        // Ambil nomor kontak dari kolom 'kontak'
        $nomor = preg_replace('/[^0-9]/', '', $pemohon->kontak);
        if (str_starts_with($nomor, '0')) {
            $nomor = '62' . substr($nomor, 1);
        }

        // Kirim WA untuk setiap verifikasi
        $pesan = "Halo *{$pemohon->name}*, permohonan bantuan dana Anda telah diverifikasi oleh verifikator ke-{$jumlahVerifikasi}. Harap tunggu proses selanjutnya.";

        $res1 = app(FonnteService::class)->send($nomor, $pesan);
        Log::info('WA ke pemohon:', ['kontak' => $pemohon->kontak, 'respon' => $res1]);

        // Jika sudah diverifikasi penuh → setujui dan kirim pesan akhir
        if ($jumlahVerifikasi >= 7) {
            $permohonan->status = 'disetujui';
            $permohonan->save();

            $pesanFinal = "Selamat *{$pemohon->name}*! Permohonan Anda telah *DISETUJUI* oleh 7 verifikator. Silakan cek dashboard Anda.";
            $res2 = app(FonnteService::class)->send($nomor, $pesanFinal);
            Log::info('WA disetujui:', ['kontak' => $pemohon->kontak, 'respon' => $res2]);
        }

        return back()->with('message', 'Berhasil verifikasi.');
    }

    public function create()
    {
        return Inertia::render('DataPermohonan/Add', [
            'Partai' => Partai::all(),
            'User' => User::all(),
        ]);
    }

    public function destroy(DataPermohonan $dataPermohonan)
    {
        $dataPermohonan->delete();

        return Redirect::route('data-permohonan.index')->with('message', 'Data berhasil dihapus');
    }

    public function dashboard()
    {
        $user = Auth::user();
        $role = $user->roles->first()?->name;

        $totalSudahAcc = 0;
        $totalBelumAcc = 0;

        if ($role && str_starts_with($role, 'verifikator-')) {
            $verifikatorStep = (int) str_replace('verifikator-', '', $role);

            $totalSudahAcc = VerifikasiDataPermohonan::where('user_id', $user->id)->count();

            $totalBelumAcc = DataPermohonan::where('status', '!=', 'ditolak')
                ->whereDoesntHave('verifikasi', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->where(function ($query) use ($verifikatorStep) {
                    $query->has('verifikasi', '=', $verifikatorStep - 1);
                })
                ->count();
        }

        return Inertia::render('Dashboard', [
            'totalSudahAcc' => $totalSudahAcc,
            'totalBelumAcc' => $totalBelumAcc,
        ]);
    }
}
