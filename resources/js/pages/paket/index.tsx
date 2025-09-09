import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';

interface Paket {
    id: number;
    nama_paket: string;
    harga: number;
    harga_formatted: string;
    tanggal_keberangkatan: string;
    durasi: number;
    kapasitas_jamaah: number;
    jenis: string;
    is_active: boolean;
    jamaah_count: number;
    sisa_kapasitas: number;
}

interface PaginationData {
    data: Paket[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    pakets: PaginationData;
    filters: {
        jenis?: string;
        status?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function PaketIndex({ pakets, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get('/paket', {
            ...filters,
            [key]: value === filters[key as keyof typeof filters] ? '' : value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (search: string) => {
        router.get('/paket', {
            ...filters,
            search,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleDelete = (paket: Paket) => {
        if (confirm(`Apakah Anda yakin ingin menghapus paket "${paket.nama_paket}"?`)) {
            router.delete(`/paket/${paket.id}`);
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Heading title="📦 Manajemen Paket" />
                    <Link href="/paket/create">
                        <Button className="bg-green-600 hover:bg-green-700">
                            ➕ Tambah Paket
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Paket</label>
                            <input
                                type="text"
                                placeholder="Nama paket..."
                                defaultValue={filters.search || ''}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Paket</label>
                            <select
                                value={filters.jenis || ''}
                                onChange={(e) => handleFilter('jenis', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="">Semua Jenis</option>
                                <option value="haji">Haji</option>
                                <option value="umroh">Umroh</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filters.status || ''}
                                onChange={(e) => handleFilter('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={() => router.get('/paket')}
                                className="w-full"
                            >
                                🔄 Reset Filter
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Pakets Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Paket</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Harga</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Keberangkatan</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Jamaah</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                                    <th className="text-right py-4 px-6 font-medium text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pakets.data.length > 0 ? (
                                    pakets.data.map((paket) => (
                                        <tr key={paket.id} className="border-t border-gray-200 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-2xl mr-3">
                                                        {paket.jenis === 'haji' ? '🕌' : '✈️'}
                                                    </span>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{paket.nama_paket}</p>
                                                        <p className="text-sm text-gray-500 capitalize">
                                                            {paket.jenis} • {paket.durasi} hari
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="font-semibold text-gray-900">{paket.harga_formatted}</p>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {formatDate(paket.tanggal_keberangkatan)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900 mr-2">
                                                        {paket.jamaah_count}/{paket.kapasitas_jamaah}
                                                    </span>
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full ${
                                                                paket.jamaah_count >= paket.kapasitas_jamaah 
                                                                    ? 'bg-red-500' 
                                                                    : paket.jamaah_count > paket.kapasitas_jamaah * 0.8
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-green-500'
                                                            }`}
                                                            style={{ width: `${Math.min((paket.jamaah_count / paket.kapasitas_jamaah) * 100, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {paket.sisa_kapasitas} tersisa
                                                </p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    paket.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {paket.is_active ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/paket/${paket.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            👁️ Lihat
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/paket/${paket.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            ✏️ Edit
                                                        </Button>
                                                    </Link>
                                                    {paket.jamaah_count === 0 && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(paket)}
                                                            className="text-red-600 hover:bg-red-50 hover:border-red-300"
                                                        >
                                                            🗑️ Hapus
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-500">
                                            <span className="text-6xl mb-4 block">📦</span>
                                            <p className="text-lg font-medium">Belum ada paket</p>
                                            <p className="text-sm">Mulai dengan menambah paket pertama</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pakets.last_page > 1 && (
                        <div className="bg-white px-6 py-3 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {((pakets.current_page - 1) * pakets.per_page) + 1} sampai{' '}
                                    {Math.min(pakets.current_page * pakets.per_page, pakets.total)} dari{' '}
                                    {pakets.total} paket
                                </div>
                                <div className="flex space-x-1">
                                    {pakets.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active
                                                    ? 'bg-green-600 text-white'
                                                    : link.url
                                                    ? 'text-gray-700 hover:bg-gray-100'
                                                    : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}