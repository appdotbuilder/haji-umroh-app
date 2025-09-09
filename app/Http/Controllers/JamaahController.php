<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJamaahRequest;
use App\Http\Requests\UpdateJamaahRequest;
use App\Models\Jamaah;
use App\Models\Paket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JamaahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Jamaah::with('paket');

        // Filter by paket
        if ($request->filled('paket_id')) {
            $query->where('paket_id', $request->paket_id);
        }

        // Filter by payment status
        if ($request->filled('status_pembayaran')) {
            $query->where('status_pembayaran', $request->status_pembayaran);
        }

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama_lengkap', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('no_paspor', 'like', '%' . $request->search . '%');
            });
        }

        $jamaah = $query->orderBy('created_at', 'desc')
                       ->paginate(10)
                       ->withQueryString();

        $pakets = Paket::active()->select('id', 'nama_paket')->get();

        return Inertia::render('jamaah/index', [
            'jamaah' => $jamaah,
            'pakets' => $pakets,
            'filters' => $request->only(['paket_id', 'status_pembayaran', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pakets = Paket::active()
            ->select('id', 'nama_paket', 'harga', 'kapasitas_jamaah')
            ->withCount('jamaah')
            ->get();

        return Inertia::render('jamaah/create', [
            'pakets' => $pakets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJamaahRequest $request)
    {
        $jamaah = Jamaah::create($request->validated());

        return redirect()->route('jamaah.show', $jamaah)
            ->with('success', 'Data jamaah berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jamaah $jamaah)
    {
        $jamaah->load('paket');

        return Inertia::render('jamaah/show', [
            'jamaah' => $jamaah,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jamaah $jamaah)
    {
        $jamaah->load('paket');
        
        $pakets = Paket::active()
            ->select('id', 'nama_paket', 'harga', 'kapasitas_jamaah')
            ->withCount('jamaah')
            ->get();

        return Inertia::render('jamaah/edit', [
            'jamaah' => $jamaah,
            'pakets' => $pakets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJamaahRequest $request, Jamaah $jamaah)
    {
        $jamaah->update($request->validated());

        return redirect()->route('jamaah.show', $jamaah)
            ->with('success', 'Data jamaah berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jamaah $jamaah)
    {
        $jamaah->delete();

        return redirect()->route('jamaah.index')
            ->with('success', 'Data jamaah berhasil dihapus.');
    }
}