<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPermohonan\StoreRequest;
use App\Models\DataPermohonan;
use App\Models\Partai;
use App\Models\User;
use App\Models\VerifikasiDataPermohonan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataPermohonanController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $daftarDataPermohonan = DataPermohonan::with('user', 'partai')->paginate(10);

        $dataPermohonanUser = DataPermohonan::where('user_id', $user->id)->get();

        $notifikasi = $dataPermohonanUser->map(function ($permohonan) {
            $jumlahVerifikasi = VerifikasiDataPermohonan::where('data_permohonan_id', $permohonan->id)->count();

            if ($jumlahVerifikasi > 0) {
                return [
                    'permohonan_id' => $permohonan->id,
                    'pesan' => "Data permohonan ID {$permohonan->id} sudah diverifikasi oleh {$jumlahVerifikasi} verifikator.",
                    'status' => $permohonan->status,
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
}
