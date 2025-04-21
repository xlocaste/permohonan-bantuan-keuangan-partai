<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partai;
use App\Http\Requests\Partai\StoreRequest;
use App\Http\Requests\Partai\UpdateRequest;
use Inertia\Inertia;

class PartaiController extends Controller
{
    public function index()
    {
        $daftarPartai = Partai::all();

        return inertia('Partai/List', [
            'partai' => $daftarPartai,
        ]);
    }

    public function store(StoreRequest $request)
    {
        Partai::create([
            'nama_partai'=>$request->nama_partai,
            'nama_ketua'=>$request->nama_ketua,
            'alamat'=>$request->alamat,
        ]);

        return redirect()->route('partai.index');
    }

    public function create()
    {
        return Inertia::render('Partai/Add');
    }
}
