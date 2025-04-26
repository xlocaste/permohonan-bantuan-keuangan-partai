<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPermohonan\StoreRequest;
use App\Models\DataPermohonan;
use App\Models\Partai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataPermohonanController extends Controller
{
    public function index()
    {
        $daftarDataPermohonan = DataPermohonan::with('user', 'partai')->paginate(10);

        return inertia('DataPermohonan/List', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'dataPermohonan' => $daftarDataPermohonan,
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

    public function verifikasi($dataPermohonan)
    {
        $permohonan = DataPermohonan::findOrFail($dataPermohonan);

        $permohonan->jumlah_verifikasi += 1;

        if ($permohonan->jumlah_verifikasi >= 7) {
            $permohonan->status = 'disetujui';
        }

        $permohonan->save();

        return redirect()->back()->with('success', 'Permohonan berhasil diverifikasi.');
    }

    public function create()
    {
        return Inertia::render('DataPermohonan/Add', [
            'Partai' => Partai::all(),
            'User' => User::all(),
        ]);
    }
}
