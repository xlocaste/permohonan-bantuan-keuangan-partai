<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partai extends Model
{
    use HasFactory;

    protected $table = 'partai';

    protected $fillable = [
        'nama_partai',
        'nama_ketua',
        'alamat',
    ];
}
