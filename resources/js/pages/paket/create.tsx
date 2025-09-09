import React from 'react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useForm, Link } from '@inertiajs/react';



export default function CreatePaket() {
    const { data, setData, post, processing, errors } = useForm({
        nama_paket: '',
        harga: '',
        tanggal_keberangkatan: '',
        durasi: '',
        fasilitas: '',
        kapasitas_jamaah: '',
        jenis: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/paket');
    };

    const fasilitasTemplates = {
        haji: [
            'Tiket pesawat PP',
            'Visa Saudi Arabia',
            'Hotel berbintang di Mekah dan Madinah',
            'Makan 3x sehari',
            'Transportasi AC full',
            'Tour guide berpengalaman',
            'Handling khusus di Mina, Arafah, dan Muzdalifah',
            'Tenda ber-AC di Arafah',
            'Catering Indonesia',
            'Ziarah lengkap Madinah',
            'Koper dan perlengkapan haji',
            'Buku panduan haji'
        ].join(', '),
        umroh: [
            'Tiket pesawat PP',
            'Visa Saudi Arabia',
            'Hotel berbintang dekat Masjidil Haram',
            'Hotel berbintang dekat Masjid Nabawi',
            'Makan 3x sehari',
            'Transportasi AC',
            'Tour guide berpengalaman',
            'City tour Madinah',
            'Ziarah tempat bersejarah',
            'Koper dan tas umroh',
            'Buku panduan umroh'
        ].join(', ')
    };

    const handleJenisChange = (jenis: string) => {
        setData('jenis', jenis);
        setData('fasilitas', fasilitasTemplates[jenis as keyof typeof fasilitasTemplates] || data.fasilitas);
        setData('durasi', jenis === 'haji' ? '35' : '14');
    };

    const handleActiveChange = (checked: boolean) => {
        // @ts-expect-error Inertia useForm type issue with boolean values
        setData('is_active', checked);
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="➕ Tambah Paket Baru" />
                    <Link href="/paket">
                        <Button variant="outline">
                            ← Kembali ke Daftar Paket
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nama Paket */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Paket *
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_paket}
                                    onChange={(e) => setData('nama_paket', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Contoh: Haji Plus 2024"
                                />
                                {errors.nama_paket && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nama_paket}</p>
                                )}
                            </div>

                            {/* Jenis */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Paket *
                                </label>
                                <select
                                    value={data.jenis}
                                    onChange={(e) => handleJenisChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Pilih Jenis</option>
                                    <option value="haji">🕌 Haji</option>
                                    <option value="umroh">✈️ Umroh</option>
                                </select>
                                {errors.jenis && (
                                    <p className="mt-1 text-sm text-red-600">{errors.jenis}</p>
                                )}
                            </div>

                            {/* Harga */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Harga (Rp) *
                                </label>
                                <input
                                    type="number"
                                    value={data.harga}
                                    onChange={(e) => setData('harga', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="25000000"
                                />
                                {errors.harga && (
                                    <p className="mt-1 text-sm text-red-600">{errors.harga}</p>
                                )}
                            </div>

                            {/* Tanggal Keberangkatan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Keberangkatan *
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_keberangkatan}
                                    onChange={(e) => setData('tanggal_keberangkatan', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                                {errors.tanggal_keberangkatan && (
                                    <p className="mt-1 text-sm text-red-600">{errors.tanggal_keberangkatan}</p>
                                )}
                            </div>

                            {/* Durasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Durasi (Hari) *
                                </label>
                                <input
                                    type="number"
                                    value={data.durasi}
                                    onChange={(e) => setData('durasi', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="14"
                                />
                                {errors.durasi && (
                                    <p className="mt-1 text-sm text-red-600">{errors.durasi}</p>
                                )}
                            </div>

                            {/* Kapasitas Jamaah */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kapasitas Jamaah *
                                </label>
                                <input
                                    type="number"
                                    value={data.kapasitas_jamaah}
                                    onChange={(e) => setData('kapasitas_jamaah', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="45"
                                />
                                {errors.kapasitas_jamaah && (
                                    <p className="mt-1 text-sm text-red-600">{errors.kapasitas_jamaah}</p>
                                )}
                            </div>
                        </div>

                        {/* Fasilitas */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fasilitas yang Termasuk *
                            </label>
                            <textarea
                                rows={6}
                                value={data.fasilitas}
                                onChange={(e) => setData('fasilitas', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Daftar fasilitas yang termasuk dalam paket..."
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Pisahkan setiap fasilitas dengan koma (,)
                            </p>
                            {errors.fasilitas && (
                                <p className="mt-1 text-sm text-red-600">{errors.fasilitas}</p>
                            )}
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active as boolean}
                                onChange={(e) => handleActiveChange(e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                                Paket aktif (dapat dilihat dan dipilih jamaah)
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link href="/paket">
                                <Button variant="outline" type="button">
                                    Batal
                                </Button>
                            </Link>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {processing ? 'Menyimpan...' : '💾 Simpan Paket'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}