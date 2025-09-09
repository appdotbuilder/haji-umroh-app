<?php

namespace Database\Seeders;

use App\Models\Paket;
use Illuminate\Database\Seeder;

class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample Haji packages
        Paket::factory()->haji()->create([
            'nama_paket' => 'Haji Reguler 2024',
            'harga' => 45000000,
            'tanggal_keberangkatan' => '2024-06-15',
            'durasi' => 35,
            'kapasitas_jamaah' => 50,
            'fasilitas' => 'Tiket pesawat PP, Visa, Hotel berbintang 3, Makan 3x sehari, Transportasi AC, Tour guide berpengalaman, Handling khusus di Mina, Tenda ber-AC di Arafah, Catering Indonesia',
        ]);

        Paket::factory()->haji()->create([
            'nama_paket' => 'Haji Plus 2024',
            'harga' => 65000000,
            'tanggal_keberangkatan' => '2024-07-10',
            'durasi' => 40,
            'kapasitas_jamaah' => 30,
            'fasilitas' => 'Tiket pesawat PP, Visa, Hotel berbintang 4, Makan 3x sehari, Transportasi AC, Tour guide berpengalaman, Handling khusus di Mina, Tenda VIP di Arafah, Catering Indonesia, Ziarah Madinah lengkap',
        ]);

        // Create sample Umroh packages
        Paket::factory()->umroh()->create([
            'nama_paket' => 'Umroh Ekonomi 2024',
            'harga' => 18000000,
            'tanggal_keberangkatan' => '2024-03-20',
            'durasi' => 9,
            'kapasitas_jamaah' => 45,
            'fasilitas' => 'Tiket pesawat PP, Visa, Hotel berbintang 3, Makan 3x sehari, Transportasi AC, Tour guide berpengalaman, City tour Madinah, Ziarah tempat bersejarah',
        ]);

        Paket::factory()->umroh()->create([
            'nama_paket' => 'Umroh Plus 2024',
            'harga' => 28000000,
            'tanggal_keberangkatan' => '2024-04-15',
            'durasi' => 14,
            'kapasitas_jamaah' => 35,
            'fasilitas' => 'Tiket pesawat PP, Visa, Hotel berbintang 4, Makan 3x sehari, Transportasi AC, Tour guide berpengalaman, Hotel dekat Masjidil Haram, Hotel dekat Masjid Nabawi, City tour Madinah, Ziarah lengkap',
        ]);

        // Create additional random packages
        Paket::factory()->count(8)->create();
    }
}