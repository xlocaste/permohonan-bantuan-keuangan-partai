import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function AddPartai({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_partai: '',
        nama_ketua: '',
        alamat: '',
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const handleConfirmSave = () => {
        post(route('partai.store'), {
            onSuccess: () => {
                reset();
                setShowConfirmModal(false);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Partai" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nama_partai" className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Partai
                        </label>
                        <input
                            id="nama_partai"
                            type="text"
                            value={data.nama_partai}
                            onChange={(e) => setData('nama_partai', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.nama_partai && <div className="text-red-500 text-sm mt-1">{errors.nama_partai}</div>}
                    </div>

                    <div>
                        <label htmlFor="nama_ketua" className="block text-sm font-medium text-gray-700 mb-1">
                            Ketua Partai
                        </label>
                        <input
                            id="nama_ketua"
                            type="text"
                            value={data.nama_ketua}
                            onChange={(e) => setData('nama_ketua', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.nama_ketua && <div className="text-red-500 text-sm mt-1">{errors.nama_ketua}</div>}
                    </div>

                    <div>
                        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat
                        </label>
                        <textarea
                            id="alamat"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            rows={4}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                        {errors.alamat && <div className="text-red-500 text-sm mt-1">{errors.alamat}</div>}
                    </div>

                    <div className="flex justify-end mt-4">
                        <PrimaryButton type="submit" disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Konfirmasi Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Konfirmasi Simpan</h2>
                        <p className="mb-4">Apakah Anda yakin ingin menyimpan data partai ini?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Batal
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                onClick={handleConfirmSave}
                                disabled={processing}
                            >
                                Ya, Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
