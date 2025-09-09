<?php

namespace Database\Factories;

use App\Models\Paket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jamaah>
 */
class JamaahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['belum_bayar', 'dp', 'lunas']);
        
        return [
            'nama_lengkap' => fake('id_ID')->name(),
            'email' => fake()->unique()->safeEmail(),
            'no_telepon' => fake('id_ID')->phoneNumber(),
            'alamat' => fake('id_ID')->address(),
            'no_paspor' => fake()->unique()->regexify('[A-Z]{2}[0-9]{7}'),
            'tanggal_lahir_paspor' => fake()->dateTimeBetween('-70 years', '-17 years'),
            'tanggal_expired_paspor' => fake()->dateTimeBetween('now', '+10 years'),
            'paket_id' => Paket::factory(),
            'status_pembayaran' => $status,
            'jumlah_bayar' => $this->generatePaymentAmount($status),
            'catatan' => fake()->optional(0.3)->paragraph(),
        ];
    }

    /**
     * Generate payment amount based on status.
     */
    protected function generatePaymentAmount(string $status): int
    {
        return match($status) {
            'belum_bayar' => 0,
            'dp' => fake()->numberBetween(5000000, 15000000), // 5-15 juta
            'lunas' => 0, // Will be set by the relationship
            default => 0,
        };
    }

    /**
     * Indicate that the jamaah has not paid.
     */
    public function belumBayar(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pembayaran' => 'belum_bayar',
            'jumlah_bayar' => 0,
        ]);
    }

    /**
     * Indicate that the jamaah has paid down payment.
     */
    public function dp(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pembayaran' => 'dp',
            'jumlah_bayar' => fake()->numberBetween(5000000, 15000000),
        ]);
    }

    /**
     * Indicate that the jamaah has paid in full.
     */
    public function lunas(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pembayaran' => 'lunas',
        ]);
    }
}