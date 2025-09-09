<?php

namespace Database\Seeders;

use App\Models\Jamaah;
use App\Models\Paket;
use Illuminate\Database\Seeder;

class JamaahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pakets = Paket::all();
        
        foreach ($pakets as $paket) {
            // Create jamaah for each paket (random number between 5-80% of capacity)
            $jamaahCount = random_int(5, (int)($paket->kapasitas_jamaah * 0.8));
            
            for ($i = 0; $i < $jamaahCount; $i++) {
                $status = fake()->randomElement(['belum_bayar', 'dp', 'lunas']);
                
                $jumlahBayar = match($status) {
                    'belum_bayar' => 0,
                    'dp' => random_int(5000000, (int)($paket->harga * 0.5)),
                    'lunas' => $paket->harga,
                    default => 0,
                };

                Jamaah::factory()->create([
                    'paket_id' => $paket->id,
                    'status_pembayaran' => $status,
                    'jumlah_bayar' => $jumlahBayar,
                ]);
            }
        }
    }
}