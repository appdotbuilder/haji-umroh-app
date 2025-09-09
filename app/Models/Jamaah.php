<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Jamaah
 *
 * @property int $id
 * @property string $nama_lengkap
 * @property string $email
 * @property string $no_telepon
 * @property string $alamat
 * @property string $no_paspor
 * @property \Illuminate\Support\Carbon $tanggal_lahir_paspor
 * @property \Illuminate\Support\Carbon $tanggal_expired_paspor
 * @property int $paket_id
 * @property string $status_pembayaran
 * @property float $jumlah_bayar
 * @property string|null $catatan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Paket $paket
 * @property-read string $jumlah_bayar_formatted
 * @property-read float $sisa_pembayaran
 * @property-read string $sisa_pembayaran_formatted
 * @property-read bool $is_lunas
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Jamaah newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Jamaah newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Jamaah query()
 * @method static \Illuminate\Database\Eloquent\Builder|Jamaah lunas()
 * @method static \Illuminate\Database\Eloquent\Builder|Jamaah belumLunas()
 * @method static \Database\Factories\JamaahFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Jamaah extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'jamaah';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_lengkap',
        'email',
        'no_telepon',
        'alamat',
        'no_paspor',
        'tanggal_lahir_paspor',
        'tanggal_expired_paspor',
        'paket_id',
        'status_pembayaran',
        'jumlah_bayar',
        'catatan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_lahir_paspor' => 'date',
        'tanggal_expired_paspor' => 'date',
        'jumlah_bayar' => 'decimal:2',
        'paket_id' => 'integer',
    ];

    /**
     * Get the paket that this jamaah belongs to.
     */
    public function paket(): BelongsTo
    {
        return $this->belongsTo(Paket::class);
    }

    /**
     * Get formatted payment amount.
     */
    public function getJumlahBayarFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->jumlah_bayar, 0, ',', '.');
    }

    /**
     * Get remaining payment amount.
     */
    public function getSisaPembayaranAttribute(): float
    {
        return $this->paket->harga - $this->jumlah_bayar;
    }

    /**
     * Get formatted remaining payment amount.
     */
    public function getSisaPembayaranFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->sisa_pembayaran, 0, ',', '.');
    }

    /**
     * Check if payment is complete.
     */
    public function getIsLunasAttribute(): bool
    {
        return $this->status_pembayaran === 'lunas';
    }

    /**
     * Scope a query to only include fully paid jamaah.
     */
    public function scopeLunas($query)
    {
        return $query->where('status_pembayaran', 'lunas');
    }

    /**
     * Scope a query to only include not fully paid jamaah.
     */
    public function scopeBelumLunas($query)
    {
        return $query->where('status_pembayaran', '!=', 'lunas');
    }
}