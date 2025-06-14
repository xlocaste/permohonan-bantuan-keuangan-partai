import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

export default function ListPartai({ auth, partai }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPartaiId, setSelectedPartaiId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedPartaiId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(route('partai.destroy', selectedPartaiId), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedPartaiId(null);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Partai" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    <div className='flex justify-end m-4'>
                        <PrimaryButton>
                            <Link href={route('partai.create')}>
                                + TAMBAH PARTAI
                            </Link>
                        </PrimaryButton>
                    </div>

                    <table className="min-w-full bg-white border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama Partai</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama Ketua Partai</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Alamat</th>
                                {auth.user && (
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">ACTION</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {partai.length > 0 ? (
                                partai.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.nama_partai}</td>
                                        <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.nama_ketua}</td>
                                        <td className="px-4 py-1 border-b text-sm text-gray-700">{item.alamat}</td>
                                        {auth.user && (
                                            <td className="px-4 py-1 border-b text-center">
                                                <div className='flex gap-2 justify-center'>
                                                    <Link
                                                        href={route('partai.edit', item.id)}
                                                        className='text-yellow-500'
                                                    >
                                                        <FaRegEdit />
                                                    </Link>
                                                    <button
                                                        className="text-red-400"
                                                        onClick={() => handleDeleteClick(item.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                        Tidak ada data partai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
                        <p className="mb-4 text-sm text-gray-700">
                            Apakah Anda yakin ingin menghapus partai ini? Tindakan ini tidak bisa dibatalkan.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                onClick={confirmDelete}
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
