<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $daftarUser = User::all()->map(function ($user) {
            $user->role = $user->getRoleNames()->first();
            return $user;
        });

        return inertia('User/List', [
            'user' => $daftarUser,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::route('user.index')->with('message', 'Data berhasil dihapus');
    }
}
