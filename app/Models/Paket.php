<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Paket
 *
 * @property int $id
 * @property string $nama_paket
 * @property float $harga
 * @property \Illuminate\Support\Carbon $tanggal_keberangkatan
 * @property int $durasi
 * @property string $fasilitas
 * @property int $kapasitas_jamaah
 * @property string $jenis
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Jamaah> $jamaah
 * @property-read int|null $jamaah_count
 * @property-read int $jamaah_terdaftar
 * @property-read int $sisa_kapasitas
 * @property-read string $harga_formatted
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Paket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Paket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Paket query()
 * @method static \Illuminate\Database\Eloquent\Builder|Paket active()
 * @method static \Illuminate\Database\Eloquent\Builder|Paket haji()
 * @method static \Illuminate\Database\Eloquent\Builder|Paket umroh()
 * @method static \Database\Factories\PaketFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Paket extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'paket';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_paket',
        'harga',
        'tanggal_keberangkatan',
        'durasi',
        'fasilitas',
        'kapasitas_jamaah',
        'jenis',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'harga' => 'decimal:2',
        'tanggal_keberangkatan' => 'date',
        'is_active' => 'boolean',
        'durasi' => 'integer',
        'kapasitas_jamaah' => 'integer',
    ];

    /**
     * Get all jamaah for this paket.
     */
    public function jamaah(): HasMany
    {
        return $this->hasMany(Jamaah::class);
    }

    /**
     * Get the number of registered jamaah.
     */
    public function getJamaahTerdaftarAttribute(): int
    {
        return $this->jamaah()->count();
    }

    /**
     * Get the remaining capacity.
     */
    public function getSisaKapasitasAttribute(): int
    {
        return $this->kapasitas_jamaah - $this->jamaah_terdaftar;
    }

    /**
     * Get formatted price.
     */
    public function getHargaFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->harga, 0, ',', '.');
    }

    /**
     * Scope a query to only include active paket.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include haji paket.
     */
    public function scopeHaji($query)
    {
        return $query->where('jenis', 'haji');
    }

    /**
     * Scope a query to only include umroh paket.
     */
    public function scopeUmroh($query)
    {
        return $query->where('jenis', 'umroh');
    }
}