import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function List({ auth, register }) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Verifikasi Pendaftar" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">NIK</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Nama</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Alamat</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Partai</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {register.length > 0 ? (
                                register.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 text-center">
                                        <td className="px-4 py-2 border-b">{item.nik}</td>
                                        <td className="px-4 py-2 border-b">{item.user.name}</td>
                                        <td className="px-4 py-2 border-b">{item.alamat}</td>
                                        <td className="px-4 py-2 border-b">{item.partai.nama_partai}</td>
                                        <td className="px-4 py-2 border-b">
                                            <div className="flex justify-center gap-2">
                                                {item.status_verifikasi === 'pending' && (
                                                    <>
                                                        <button
                                                            className="text-green-600 hover:text-green-800"
                                                            onClick={() => handleVerifikasi(item.id, 'disetujui')}
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                        <button
                                                            className="text-red-600 hover:text-red-800"
                                                            onClick={() => handleVerifikasi(item.id, 'ditolak')}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                )}
                                                {(item.status_verifikasi === 'disetujui' || item.status_verifikasi === 'ditolak') && (
                                                    <span className="text-gray-500 italic">Sudah diverifikasi</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                                        Tidak ada data pendaftar.
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
