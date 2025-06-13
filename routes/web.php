<?php

use App\Http\Controllers\AktivitasController;
use App\Http\Controllers\DataPermohonanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PartaiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegisterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DataPermohonanController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/partai')->name('partai.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [PartaiController::class, 'create'])->name('create');
        Route::post('/', [PartaiController::class, 'store'])->name('store');
        Route::put('/{partai}', [PartaiController::class, 'update'])->name('update');
        Route::delete('/{partai}', [PartaiController::class, 'destroy'])->name('destroy');
        Route::get('/{partai}/edit', [PartaiController::class, 'edit'])->name('edit');
    });
    Route::get('/', [PartaiController::class, 'index'])->name('index');
});

Route::prefix('/user')->name('user.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::put('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
    });
    Route::get('/', [UserController::class, 'index'])->name('index');
});

Route::prefix('/register/user')->name('register.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [RegisterController::class, 'create'])->name('create');
        Route::post('/', [RegisterController::class, 'store'])->name('store');
        Route::put('/{register}', [RegisterController::class, 'update'])->name('update');
        Route::delete('/{register}', [RegisterController::class, 'destroy'])->name('destroy');
        Route::get('/{register}/edit', [RegisterController::class, 'edit'])->name('edit');
    });
    Route::post('/verifikasi/{userId}', [RegisterController::class, 'updateApproval'])->name('approval');
    Route::get('/', [RegisterController::class, 'index'])->name('index');
});

Route::prefix('/data-permohonan')->name('data-permohonan.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [DataPermohonanController::class, 'create'])->name('create');
        Route::post('/', [DataPermohonanController::class, 'store'])->name('store');
        Route::put('/{dataPermohonan}', [DataPermohonanController::class, 'update'])->name('update');
        Route::delete('/{dataPermohonan}', [DataPermohonanController::class, 'destroy'])->name('destroy');
        Route::get('/{dataPermohonan}/edit', [DataPermohonanController::class, 'edit'])->name('edit');
        Route::post('/{id}/verifikasi', [DataPermohonanController::class, 'verifikasi'])->name('verifikasi');
    });
    Route::get('/', [DataPermohonanController::class, 'index'])->name('index');
});

Route::prefix('/laporan')->name('laporan.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/create', [DataPermohonanController::class, 'create'])->name('create');
        Route::post('/', [DataPermohonanController::class, 'store'])->name('store');
        Route::put('/{dataPermohonan}', [DataPermohonanController::class, 'update'])->name('update');
        Route::delete('/{dataPermohonan}', [DataPermohonanController::class, 'destroy'])->name('destroy');
        Route::get('/{dataPermohonan}/edit', [DataPermohonanController::class, 'edit'])->name('edit');
        Route::post('/{id}/verifikasi', [DataPermohonanController::class, 'verifikasi'])->name('verifikasi');
    });
    Route::get('/', [DataPermohonanController::class, 'laporan'])->name('index');
    Route::get('/{dataPermohonan}/print', [DataPermohonanController::class, 'print'])->name('print');
    Route::get('/print/all', [DataPermohonanController::class, 'printAll'])->name('printAll');
});

Route::prefix('/aktivitas')->name('aktivitas.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/', [AktivitasController::class, 'index'])->name('index');
    });
});

require __DIR__.'/auth.php';
