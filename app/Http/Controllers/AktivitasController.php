<?php

namespace App\Http\Controllers;

use App\Models\Aktivitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AktivitasController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $aktivitas = Aktivitas::where('user_id', $user->id)
            ->orderBy('waktu', 'desc')
            ->get();

        return inertia('Aktivitas/List', [
            'aktivitas' => $aktivitas
        ]);
    }
}
