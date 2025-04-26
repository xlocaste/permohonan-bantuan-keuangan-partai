<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerifikasiDataPermohonan extends Model
{
    use HasFactory;

    protected $table = 'verifikasi_data_permohonan';

    protected $fillable = [
        'data_permohonan_id',
        'user_id',
    ];

    public function permohonan()
    {
        return $this->belongsTo(DataPermohonan::class, 'data_permohonan_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
