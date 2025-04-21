import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Add({ auth, Partai }) {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        alamat: '',
        partai_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('register.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Formulir Pendaftaran" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Formulir Pendaftaran</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                        <input
                            id="nama"
                            type="text"
                            value={auth.user.name}
                            disabled
                            className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm text-gray-700 cursor-not-allowed"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="partai_id" className="block text-sm font-medium text-gray-700">
                            Pilih Partai
                        </label>
                        <select
                            id="partai_id"
                            value={data.partai_id}
                            onChange={(e) => setData('partai_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">-- Pilih Partai --</option>
                            {Partai.map((partai) => (
                                <option key={partai.id} value={partai.id}>
                                    {partai.nama_partai} - {partai.nama_ketua}
                                </option>
                            ))}
                        </select>
                        {errors.partai_id && <p className="text-sm text-red-600">{errors.partai_id}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <textarea
                            id="alamat"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.alamat && <p className="text-sm text-red-600">{errors.alamat}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                            NIK
                        </label>
                        <input
                            type="text"
                            id="nik"
                            value={data.nik}
                            onChange={(e) => setData('nik', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.nik && <p className="text-sm text-red-600">{errors.nik}</p>}
                    </div>  

                    <div className="flex justify-end">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                        >
                            Daftar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
