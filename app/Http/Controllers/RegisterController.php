<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Register;
use App\Models\Partai;
use App\Models\User;
use App\Http\Requests\Register\StoreRequest;
use App\Http\Requests\Register\UpdateRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('roles');

        if ($user->roles->contains('name', 'anggota')) {
            $daftarRegister = Register::with(['user', 'partai'])
                ->where('user_id', $user->id)
                ->get();
        } else {
            $daftarRegister = Register::with(['user', 'partai'])->get();
        }

        return inertia('Register/List', [
            'auth' => [
                'user' => $user->load('roles')
            ],
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

        return redirect()->route('register.index');
    }

    public function create()
    {
        return Inertia::render('Register/Add', [
        'Partai' => Partai::all(),
        'User' => User::all(),
        ]);
    }
    
}
