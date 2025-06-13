import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { IoPrint } from 'react-icons/io5';

export default function ListLaporan({ auth, dataPermohonan, filters }) {
    const [searchNama, setSearchNama] = useState(filters.search_nama || '');
    const [searchTanggal, setSearchTanggal] = useState(filters.search_tanggal || '');
    const [filterBulan, setFilterBulan] = useState(filters.filter_bulan || '');
    const [filterTahun, setFilterTahun] = useState(filters.filter_tahun || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('laporan.index'), {
            search_nama: searchNama,
            search_tanggal: searchTanggal,
            filter_bulan: filterBulan,
            filter_tahun: filterTahun,
        }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Permohonan Terverifikasi" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Cari Nama Pengguna"
                        value={searchNama}
                        onChange={(e) => setSearchNama(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                    <select
                        value={filterBulan}
                        onChange={(e) => setFilterBulan(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="">Filter Bulan</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <select
                        value={filterTahun}
                        onChange={(e) => setFilterTahun(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="">Filter Tahun</option>
                        {Array.from({ length: 6 }, (_, i) => 2020 + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <button type="submit" className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Cari
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama Pengguna</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama Partai</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Tanggal Permohonan</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">NPWP</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Rekening</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Keterangan</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPermohonan?.data && dataPermohonan.data.length > 0 ? (
                                dataPermohonan.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b text-sm text-center">{item.user?.name || '-'}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center">{item.partai?.nama_partai || '-'}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center">{item.tanggal_permohonan}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center">{item.npwp}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center">{item.rekening}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center">{item.keterangan}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center">
                                            <a
                                                href={route('laporan.print', item.id)}
                                                target="_blank"
                                                className="text-blue-500 text-xl rounded"
                                            >
                                                <IoPrint />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                                        Tidak ada data permohonan yang diverifikasi 7 verifikator.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
