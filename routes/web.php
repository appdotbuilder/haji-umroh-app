<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaketController;
use App\Http\Controllers\JamaahController;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - shows welcome for non-authenticated, dashboard for authenticated
Route::get('/', function () {
    if (auth()->check()) {
        return app(DashboardController::class)->index(request());
    }
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Resource routes for paket management
    Route::resource('paket', PaketController::class);
    
    // Resource routes for jamaah management
    Route::resource('jamaah', JamaahController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
