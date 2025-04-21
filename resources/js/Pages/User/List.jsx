import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

export default function ListUser({ auth, user }) {
    const handlePageChange = (url) => {
        if (url) {
            router.visit(url);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Pengguna" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    <div className='flex justify-end m-4'>
                        <PrimaryButton>
                            <Link href={route('user.create')}>
                                + TAMBAH PENGGUNA
                            </Link>
                        </PrimaryButton>
                    </div>

                    <table className="min-w-full bg-white border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Email</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Kontak</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Role</th>
                                {auth.user && (
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">ACTION</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {user.length > 0 ? (
                                user.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.name}</td>
                                        <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.email}</td>
                                        <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.kontak}</td>
                                        <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.role}</td>
                                        {auth.user && (
                                            <td className="px-4 py-1 border-b text-center">
                                                <div className='flex gap-2 justify-center'>
                                                    <Link
                                                        href={route('user.edit', item.id)}
                                                        className='text-yellow-500'
                                                    >
                                                        <FaRegEdit />
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        className="text-red-400"
                                                        onClick={() => {
                                                            if (confirm('Yakin ingin menghapus pengguna ini?')) {
                                                                router.delete(route('user.destroy', item.id));
                                                            }
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </Link>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                        Tidak ada data pengguna.
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
