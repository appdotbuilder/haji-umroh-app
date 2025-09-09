<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paket>
 */
class PaketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis = fake()->randomElement(['haji', 'umroh']);
        $durasi = $jenis === 'haji' ? fake()->numberBetween(30, 45) : fake()->numberBetween(9, 21);
        $harga = $jenis === 'haji' 
            ? fake()->numberBetween(45000000, 85000000)  // 45-85 juta
            : fake()->numberBetween(12000000, 35000000); // 12-35 juta
        
        return [
            'nama_paket' => $this->generatePackageName($jenis),
            'harga' => $harga,
            'tanggal_keberangkatan' => fake()->dateTimeBetween('now', '+1 year'),
            'durasi' => $durasi,
            'fasilitas' => $this->generateFasilitas($jenis),
            'kapasitas_jamaah' => fake()->numberBetween(20, 100),
            'jenis' => $jenis,
            'is_active' => fake()->boolean(85), // 85% chance active
        ];
    }

    /**
     * Generate package name based on type.
     */
    protected function generatePackageName(string $jenis): string
    {
        $categories = [
            'haji' => ['Reguler', 'Plus', 'Premium', 'VIP', 'Executive'],
            'umroh' => ['Ekonomi', 'Reguler', 'Plus', 'Premium', 'Executive', 'VIP']
        ];
        
        $category = fake()->randomElement($categories[$jenis]);
        $year = fake()->dateTimeBetween('now', '+1 year')->format('Y');
        
        return ucfirst($jenis) . ' ' . $category . ' ' . $year;
    }

    /**
     * Generate facilities based on type.
     */
    protected function generateFasilitas(string $jenis): string
    {
        $common = [
            'Tiket pesawat PP',
            'Visa',
            'Hotel berbintang',
            'Makan 3x sehari',
            'Transportasi AC',
            'Tour guide berpengalaman',
            'Koper dan tas',
            'Buku panduan'
        ];
        
        $haji_specific = [
            'Handling khusus di Mina',
            'Tenda ber-AC di Arafah',
            'Catering Indonesia',
            'Ziarah Madinah'
        ];
        
        $umroh_specific = [
            'City tour Madinah',
            'Ziarah tempat bersejarah',
            'Hotel dekat Masjidil Haram',
            'Hotel dekat Masjid Nabawi'
        ];
        
        $facilities = $common;
        if ($jenis === 'haji') {
            $facilities = array_merge($facilities, fake()->randomElements($haji_specific, fake()->numberBetween(2, 4)));
        } else {
            $facilities = array_merge($facilities, fake()->randomElements($umroh_specific, fake()->numberBetween(2, 4)));
        }
        
        return implode(', ', $facilities);
    }

    /**
     * Indicate that the paket is for haji.
     */
    public function haji(): static
    {
        return $this->state(fn (array $attributes) => [
            'jenis' => 'haji',
            'durasi' => fake()->numberBetween(30, 45),
            'harga' => fake()->numberBetween(45000000, 85000000),
        ]);
    }

    /**
     * Indicate that the paket is for umroh.
     */
    public function umroh(): static
    {
        return $this->state(fn (array $attributes) => [
            'jenis' => 'umroh',
            'durasi' => fake()->numberBetween(9, 21),
            'harga' => fake()->numberBetween(12000000, 35000000),
        ]);
    }

    /**
     * Indicate that the paket is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}