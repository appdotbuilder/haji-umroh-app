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
        Schema::create('jamaah', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('email')->unique();
            $table->string('no_telepon');
            $table->text('alamat');
            $table->string('no_paspor')->unique();
            $table->date('tanggal_lahir_paspor');
            $table->date('tanggal_expired_paspor');
            $table->foreignId('paket_id')->constrained('paket')->onDelete('cascade');
            $table->enum('status_pembayaran', ['belum_bayar', 'dp', 'lunas'])->default('belum_bayar');
            $table->decimal('jumlah_bayar', 15, 2)->default(0);
            $table->text('catatan')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('paket_id');
            $table->index('status_pembayaran');
            $table->index('nama_lengkap');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jamaah');
    }
};