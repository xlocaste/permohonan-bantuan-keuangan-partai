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
        DataPermohonan::create([
            'partai_id'=>$request->partai_id,
            'user_id'=>$request->user_id,
            'tanggal_permohonan'=>$request->tanggal_permohonan,
            'surat_permohonan'=>$request->surat_permohonan,
            'surat_dpp'=>$request->surat_dpp,
            'npwp'=>$request->npwp,
            'suket'=>$request->suket,
            'rekening'=>$request->rekening,
            'rencana_penggunaan'=>$request->rencana_penggunaan,
            'irelasi'=>$request->irelasi,
            'surat_pernyataan'=>$request->surat_pernyataan,
            'status'=>$request->status,
            'keterangan'=>$request->keterangan,
        ]);

        return redirect()->route('data-permohonan.index');
    }

    public function create()
    {
        return Inertia::render('DataPermohonan/Add', [
            'Partai' => Partai::all(),
            'User' => User::all(),
        ]);
    }
}
