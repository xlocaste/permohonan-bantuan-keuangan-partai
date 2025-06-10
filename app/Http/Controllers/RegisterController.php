<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Register;
use App\Models\Partai;
use App\Models\User;
use App\Http\Requests\Register\StoreRequest;
use App\Http\Requests\Register\UpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        $register = User::where('is_approved', false)
                    ->with('partai')
                    ->get();

        return inertia('Register/List', [
            'register' => $register,
            'auth' => auth()->user(),
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

    public function updateApproval(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        if ($user->roles->contains('name', 'admin')) {
            return response()->json(['error' => 'Tidak dapat mengubah status approval untuk admin'], 400);
        }

        $isApproved = $request->input('action') === 'disetujui' ? true : false;

        $user->update([
            'is_approved' => $isApproved,
        ]);
    }

    public function destroy(User $register)
    {
        $register->delete();

        return Redirect::route('register.index')->with('message', 'Data berhasil dihapus');
    }
}
