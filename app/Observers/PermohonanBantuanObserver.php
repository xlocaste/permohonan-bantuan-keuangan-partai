<?php

namespace App\Observers;

use App\Models\Aktivitas;
use App\Models\DataPermohonan;
use Illuminate\Support\Facades\Auth;

class PermohonanBantuanObserver
{
    public function created(DataPermohonan $model)
    {
        $this->log('menambahkan', $model);
    }

    public function updated(DataPermohonan $model)
    {
        $this->log('mengedit', $model);
    }

    public function deleted(DataPermohonan $model)
    {
        $this->log('menghapus', $model);
    }

    protected function log($aksi, $model)
    {
        if (Auth::check()) {
            Aktivitas::create([
                'user_id' => Auth::id(),
                'deskripsi' => ucfirst($aksi) . ' permohonan bantuan: ' . ($model->tanggal_permohonan ?? ' (data tidak ada)'),
                'waktu' => now(),
            ]);
        }
    }
}
