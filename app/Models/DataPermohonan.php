<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPermohonan extends Model
{
    use HasFactory;

    protected $table = "data_permohonan";

    protected $fillable = [
        "partai_id",
        "user_id",
        "tanggal_permohonan",
        "surat_permohonan",
        "surat_dpp",
        "npwp",
        "suket",
        "rekening",
        "rencana_penggunaan",
        "realisasi",
        "surat_pernyataan",
        "status",
        "keterangan",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function partai()
    {
        return $this->belongsTo(Partai::class);
    }
}
