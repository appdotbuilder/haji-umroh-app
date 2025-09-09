import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface DashboardStats {
    total_paket: number;
    total_jamaah: number;
    total_haji: number;
    total_umroh: number;
    jamaah_lunas: number;
    jamaah_belum_lunas: number;
    total_pendapatan: number;
}

interface PaketStats {
    jenis: string;
    count: number;
    total_kapasitas: number;
}

interface RecentJamaah {
    id: number;
    nama_lengkap: string;
    email: string;
    paket: {
        nama_paket: string;
        jenis: string;
    };
    status_pembayaran: string;
    created_at: string;
}

interface UpcomingDepartures {
    id: number;
    nama_paket: string;
    tanggal_keberangkatan: string;
    jenis: string;
    kapasitas_jamaah: number;
    jamaah_count: number;
}

interface Props {
    stats: DashboardStats;
    paket_stats: PaketStats[];
    recent_jamaah: RecentJamaah[];
    upcoming_departures: UpcomingDepartures[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, paket_stats, recent_jamaah, upcoming_departures }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            belum_bayar: { label: 'Belum Bayar', class: 'bg-red-100 text-red-800' },
            dp: { label: 'DP', class: 'bg-yellow-100 text-yellow-800' },
            lunas: { label: 'Lunas', class: 'bg-green-100 text-green-800' },
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || { label: status, class: 'bg-gray-100 text-gray-800' };
        
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.class}`}>
                {config.label}
            </span>
        );
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Heading title="📊 Dashboard Haji & Umroh" />
                    <div className="flex space-x-3">
                        <Link href="/paket/create">
                            <Button className="bg-green-600 hover:bg-green-700">
                                ➕ Tambah Paket
                            </Button>
                        </Link>
                        <Link href="/jamaah/create">
                            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                👥 Tambah Jamaah
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <span className="text-2xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Paket</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_paket}</p>
                                <p className="text-xs text-gray-500">
                                    {stats.total_haji} Haji • {stats.total_umroh} Umroh
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Jamaah</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_jamaah}</p>
                                <p className="text-xs text-gray-500">Terdaftar di sistem</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                                <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.total_pendapatan)}</p>
                                <p className="text-xs text-gray-500">Pembayaran masuk</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <span className="text-2xl">📈</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Status Pembayaran</p>
                                <p className="text-2xl font-bold text-green-600">{stats.jamaah_lunas}</p>
                                <p className="text-xs text-gray-500">
                                    Lunas • {stats.jamaah_belum_lunas} Belum lunas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Package Statistics */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            📊 Statistik Paket
                        </h3>
                        <div className="space-y-4">
                            {paket_stats.map((stat) => (
                                <div key={stat.jenis} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">
                                            {stat.jenis === 'haji' ? '🕌' : '✈️'}
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-900 capitalize">
                                                Paket {stat.jenis}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {stat.count} paket aktif
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">{stat.total_kapasitas}</p>
                                        <p className="text-xs text-gray-500">Total kapasitas</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Jamaah Registrations */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                👥 Jamaah Terbaru
                            </h3>
                            <Link href="/jamaah">
                                <Button variant="outline" size="sm">
                                    Lihat Semua
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_jamaah.length > 0 ? (
                                recent_jamaah.map((jamaah) => (
                                    <div key={jamaah.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {jamaah.nama_lengkap}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {jamaah.paket.nama_paket}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                jamaah.paket.jenis === 'haji' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {jamaah.paket.jenis}
                                            </span>
                                            {getStatusBadge(jamaah.status_pembayaran)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500">
                                    <span className="text-4xl mb-2 block">👤</span>
                                    <p>Belum ada jamaah terdaftar</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upcoming Departures */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            ✈️ Keberangkatan Mendatang
                        </h3>
                        <Link href="/paket">
                            <Button variant="outline" size="sm">
                                Lihat Semua Paket
                            </Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Paket</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tanggal Berangkat</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Jamaah</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcoming_departures.length > 0 ? (
                                    upcoming_departures.map((departure) => (
                                        <tr key={departure.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-2">
                                                        {departure.jenis === 'haji' ? '🕌' : '✈️'}
                                                    </span>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{departure.nama_paket}</p>
                                                        <p className="text-xs text-gray-500 capitalize">{departure.jenis}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {formatDate(departure.tanggal_keberangkatan)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {departure.jamaah_count}/{departure.kapasitas_jamaah}
                                                    </span>
                                                    <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-green-600 h-2 rounded-full" 
                                                            style={{ width: `${(departure.jamaah_count / departure.kapasitas_jamaah) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    departure.jamaah_count >= departure.kapasitas_jamaah
                                                        ? 'bg-red-100 text-red-800'
                                                        : departure.jamaah_count > departure.kapasitas_jamaah * 0.8
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {departure.jamaah_count >= departure.kapasitas_jamaah
                                                        ? 'Penuh'
                                                        : departure.jamaah_count > departure.kapasitas_jamaah * 0.8
                                                        ? 'Hampir Penuh'
                                                        : 'Tersedia'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">
                                            <span className="text-4xl mb-2 block">📅</span>
                                            <p>Belum ada keberangkatan mendatang</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}