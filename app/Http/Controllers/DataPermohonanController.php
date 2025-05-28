<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPermohonan\StoreRequest;
use App\Http\Requests\DataPermohonan\UpdateRequest;
use App\Models\DataPermohonan;
use App\Models\Partai;
use App\Models\User;
use App\Models\VerifikasiDataPermohonan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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

    public function laporan()
    {
        $user = Auth::user();

        $dataTerverifikasiPenuh = DataPermohonan::with('user', 'partai')
            ->whereHas('verifikasi', function ($q) {
                $q->select('data_permohonan_id')
                ->groupBy('data_permohonan_id')
                ->havingRaw('COUNT(*) = 7');
            })
            ->paginate(10);

        return inertia('Laporan/List', [
            'auth' => [
                'user' => $user,
            ],
            'dataPermohonan' => $dataTerverifikasiPenuh,
        ]);
    }

    public function print($dataPermohonan)
    {
        $permohonan = DataPermohonan::with(['user', 'partai'])->findOrFail($dataPermohonan);

        return Inertia::render('Laporan/Print', [
            'permohonan' => $permohonan,
        ]);
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
        $permohonan = DataPermohonan::findOrFail($dataPermohonan);

        $permohonan->status = $request->status;

        $permohonan->alasan_penolakan = $request->status === 'ditolak'
            ? $request->alasan_penolakan
            : null;

        $permohonan->save();

        return redirect()->route('data-permohonan.index');
    }

    public function verifikasi($id)
    {
        $user = auth()->user();

        $sudahVerifikasi = VerifikasiDataPermohonan::where('data_permohonan_id', $id)
            ->where('user_id', $user->id)
            ->exists();

        if ($sudahVerifikasi) {
            return back()->with('message', 'Anda sudah memverifikasi permohonan ini.');
        }

        VerifikasiDataPermohonan::create([
            'data_permohonan_id' => $id,
            'user_id' => $user->id,
        ]);

        $jumlah = VerifikasiDataPermohonan::where('data_permohonan_id', $id)->count();

        if ($jumlah >= 7) {
            DataPermohonan::where('id', $id)->update(['status' => 'disetujui']);
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
}
