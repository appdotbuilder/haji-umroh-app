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
        Schema::create('paket', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket');
            $table->decimal('harga', 15, 2);
            $table->date('tanggal_keberangkatan');
            $table->integer('durasi'); // in days
            $table->text('fasilitas');
            $table->integer('kapasitas_jamaah');
            $table->enum('jenis', ['haji', 'umroh'])->default('umroh');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('jenis');
            $table->index('is_active');
            $table->index('tanggal_keberangkatan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket');
    }
};