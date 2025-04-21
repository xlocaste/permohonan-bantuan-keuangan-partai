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
}
