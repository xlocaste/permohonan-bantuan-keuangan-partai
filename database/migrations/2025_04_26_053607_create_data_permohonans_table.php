<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_permohonan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('partai_id');
            $table->unsignedBigInteger('user_id');
            $table->date('tanggal_permohonan');
            $table->string('surat_permohonan');
            $table->string('surat_dpp');
            $table->string('npwp');
            $table->string('suket');
            $table->string('rekening');
            $table->string('rencana_penggunaan');
            $table->string('irelasi');
            $table->string('surat_pernyataan');
            $table->string('status');
            $table->string('keterangan');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('partai_id')->references('id')->on('partai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_permohonan');
    }
};
