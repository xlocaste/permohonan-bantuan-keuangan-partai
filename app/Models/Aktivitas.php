<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aktivitas extends Model
{
    use HasFactory;

    protected $table = 'aktivitas';

    protected $fillable = [
        'user_id',
        'deskripsi',
        'waktu',
    ];

    protected $dates = ['waktu'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
