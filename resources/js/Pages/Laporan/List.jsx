import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { IoPrint } from "react-icons/io5";

export default function ListLaporan({ auth, dataPermohonan }) {
    console.log(dataPermohonan)
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Laporan Permohonan Terverifikasi" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">

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
                                            <Link
                                                href={route('laporan.print', item.id)}
                                                target="_blank"
                                                className="text-blue-500 text-xl rounded"
                                            >
                                                <IoPrint />
                                            </Link>
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
