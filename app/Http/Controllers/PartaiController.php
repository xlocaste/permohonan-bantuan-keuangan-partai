<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partai;
use App\Http\Requests\Partai\StoreRequest;
use App\Http\Requests\Partai\UpdateRequest;
use Illuminate\Support\Facades\Redirect;
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

    public function update(UpdateRequest $request, Partai $partai)
    {
        $partai->update([
            'nama_partai'=>$request->nama_partai,
            'nama_ketua'=>$request->nama_ketua,
            'alamat'=>$request->alamat,
        ]);

        return redirect()->route('partai.index');
    }

    public function destroy(Partai $partai)
    {
        $partai->delete();

        return Redirect::route('partai.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(Partai $partai)
    {
        return Inertia::render('Partai/Update', [
            'partai' => $partai,
        ]);
    }

    public function create()
    {
        return Inertia::render('Partai/Add');
    }
}
