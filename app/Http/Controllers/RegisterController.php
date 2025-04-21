<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Register;
use App\Models\Partai;
use App\Models\User;
use App\Http\Requests\Register\StoreRequest;
use App\Http\Requests\Register\UpdateRequest;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        $daftarRegister = Register::with(['user', 'partai'])->get();

        return inertia('Register/List', [
            'register' => $daftarRegister,
        ]);
    }

    public function store(StoreRequest $request)
    {
        Register::create([
            'nik' => $request->nik,
            'alamat' => $request->alamat,
            'partai_id' => $request->partai_id,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('register.create');
    }

    public function create()
    {
        return Inertia::render('Register/Add', [
        'Partai' => Partai::all(),
        'User' => User::all(),
        ]);
    }
    
}
