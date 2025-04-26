<?php

namespace App\Http\Controllers;

use App\Models\DataPermohonan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
