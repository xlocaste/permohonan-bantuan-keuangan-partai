<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    use HasFactory;

    protected $table = 'register';

    protected $fillable = [
        'nik',
        'alamat',
        'user_id',
        'partai_id',
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
