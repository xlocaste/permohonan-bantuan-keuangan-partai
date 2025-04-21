<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Register;
use App\Http\Requests\Register\StoreRequest;
use App\Http\Requests\Register\UpdateRequest;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        $daftarRegister = Register::with(['user', 'partai'])->paginate(10);

        return inertia('Register/List', [
            'register' => $daftarRegister,
        ]);
    }
}
