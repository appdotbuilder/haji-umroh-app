<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaketRequest;
use App\Http\Requests\UpdatePaketRequest;
use App\Models\Paket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Paket::withCount('jamaah');

        // Filter by type
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        // Filter by status
        if ($request->filled('status')) {
            $active = $request->status === 'active';
            $query->where('is_active', $active);
        }

        // Search
        if ($request->filled('search')) {
            $query->where('nama_paket', 'like', '%' . $request->search . '%');
        }

        $pakets = $query->orderBy('tanggal_keberangkatan')
                       ->paginate(10)
                       ->withQueryString();

        return Inertia::render('paket/index', [
            'pakets' => $pakets,
            'filters' => $request->only(['jenis', 'status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('paket/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaketRequest $request)
    {
        $paket = Paket::create($request->validated());

        return redirect()->route('paket.show', $paket)
            ->with('success', 'Paket berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Paket $paket)
    {
        $paket->load(['jamaah' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('paket/show', [
            'paket' => $paket,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paket $paket)
    {
        return Inertia::render('paket/edit', [
            'paket' => $paket,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaketRequest $request, Paket $paket)
    {
        $paket->update($request->validated());

        return redirect()->route('paket.show', $paket)
            ->with('success', 'Paket berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paket $paket)
    {
        // Check if paket has jamaah
        if ($paket->jamaah()->count() > 0) {
            return back()->with('error', 'Paket tidak dapat dihapus karena masih memiliki jamaah terdaftar.');
        }

        $paket->delete();

        return redirect()->route('paket.index')
            ->with('success', 'Paket berhasil dihapus.');
    }
}