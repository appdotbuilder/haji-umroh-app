<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Jamaah;
use App\Models\Paket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index(Request $request)
    {
        // Get statistics
        $totalPaket = Paket::active()->count();
        $totalJamaah = Jamaah::count();
        $totalHaji = Paket::active()->haji()->count();
        $totalUmroh = Paket::active()->umroh()->count();
        
        // Payment statistics
        $jamaahLunas = Jamaah::lunas()->count();
        $jamaahBelumLunas = Jamaah::belumLunas()->count();
        $totalPendapatan = Jamaah::sum('jumlah_bayar');
        
        // Package data for charts
        $paketStats = Paket::active()
            ->selectRaw('jenis, COUNT(*) as count, SUM(kapasitas_jamaah) as total_kapasitas')
            ->groupBy('jenis')
            ->get();
            
        // Recent jamaah registrations
        $recentJamaah = Jamaah::with('paket')
            ->latest()
            ->limit(5)
            ->get();
            
        // Upcoming departures
        $upcomingDepartures = Paket::active()
            ->with(['jamaah'])
            ->where('tanggal_keberangkatan', '>=', now())
            ->orderBy('tanggal_keberangkatan')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'total_paket' => $totalPaket,
                'total_jamaah' => $totalJamaah,
                'total_haji' => $totalHaji,
                'total_umroh' => $totalUmroh,
                'jamaah_lunas' => $jamaahLunas,
                'jamaah_belum_lunas' => $jamaahBelumLunas,
                'total_pendapatan' => $totalPendapatan,
            ],
            'paket_stats' => $paketStats,
            'recent_jamaah' => $recentJamaah,
            'upcoming_departures' => $upcomingDepartures,
        ]);
    }
}