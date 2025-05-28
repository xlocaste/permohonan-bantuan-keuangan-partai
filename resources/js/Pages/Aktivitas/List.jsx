import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, aktivitas }) {
    console.log(aktivitas)
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Riwayat Aktivitas" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    <h1 className="text-xl font-bold mb-6">Riwayat Aktivitas</h1>

                    <table className="min-w-full bg-white border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Waktu</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aktivitas.length > 0 ? (
                                aktivitas.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b text-sm text-gray-700 text-center">
                                            {new Date(item.waktu).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border-b text-sm text-gray-700 text-center">
                                            {item.deskripsi}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
                                        Tidak ada aktivitas ditemukan.
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
