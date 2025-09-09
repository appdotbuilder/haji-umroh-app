import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-2xl">🕌</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold text-gray-900">Haji & Umroh</h1>
                                <p className="text-sm text-gray-500">Management System</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/login">
                                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                    Masuk
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="flex space-x-4 text-6xl">
                            <span>🕌</span>
                            <span>📋</span>
                            <span>✈️</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Sistem Manajemen <span className="text-green-600">Haji & Umroh</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Kelola perjalanan ibadah dengan mudah dan profesional. Sistem terintegrasi untuk 
                        pengelolaan paket, jamaah, dan administrasi haji umroh yang komprehensif.
                    </p>
                    
                    <div className="flex justify-center space-x-6">
                        <Link href="/login">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                                🚀 Mulai Sekarang
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                            📖 Pelajari Lebih Lanjut
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
                        <p className="text-lg text-gray-600">Solusi lengkap untuk manajemen travel haji dan umroh</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Dashboard Analytics */}
                        <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Analytics</h3>
                            <p className="text-gray-600">
                                Visualisasi data paket dan jamaah dalam bentuk diagram yang mudah dipahami dan informatif.
                            </p>
                        </div>

                        {/* Package Management */}
                        <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📦</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Manajemen Paket</h3>
                            <p className="text-gray-600">
                                Kelola paket haji dan umroh dengan detail lengkap: harga, tanggal, fasilitas, dan kapasitas.
                            </p>
                        </div>

                        {/* Pilgrim Management */}
                        <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">👥</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Jamaah</h3>
                            <p className="text-gray-600">
                                Sistem lengkap untuk mengelola data jamaah, informasi paspor, dan status pembayaran.
                            </p>
                        </div>

                        {/* Payment Tracking */}
                        <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tracking Pembayaran</h3>
                            <p className="text-gray-600">
                                Monitor status pembayaran jamaah dengan sistem yang terorganisir dan real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-green-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">🎯</div>
                            <div className="text-3xl font-bold mb-1">100%</div>
                            <div className="text-green-100">Terintegrasi</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">⚡</div>
                            <div className="text-3xl font-bold mb-1">Real-time</div>
                            <div className="text-green-100">Data Updates</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">🔒</div>
                            <div className="text-3xl font-bold mb-1">Secure</div>
                            <div className="text-green-100">Data Protection</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Siap Mengelola Bisnis Haji & Umroh Anda?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Bergabunglah dengan sistem manajemen yang telah dipercaya untuk mengelola 
                        perjalanan ibadah dengan profesional dan efisien.
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                        <Link href="/register">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                                🚀 Daftar Gratis Sekarang
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4">
                                Sudah Punya Akun? Masuk
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                                <span className="text-white text-lg">🕌</span>
                            </div>
                            <span className="text-lg font-semibold">Haji & Umroh Management System</span>
                        </div>
                        <p className="text-gray-400">
                            © 2024 Sistem Manajemen Haji & Umroh. Dibangun dengan Laravel dan React.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}