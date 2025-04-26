import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function AddDataPermohonan({ auth, Partai }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        partai_id: '',
        user_id: auth.user.id,
        tanggal_permohonan: '',
        surat_permohonan: '',
        surat_dpp: '',
        npwp: '',
        suket: '',
        rekening: '',
        rencana_penggunaan: '',
        irelasi: '',
        surat_pernyataan: '',
        status: 'menunggu',
        keterangan: '',
    });

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setData('tanggal_permohonan', today);
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('data-permohonan.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Data Permohonan" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Permohonan</label>
                        <input
                            type="date"
                            value={data.tanggal_permohonan}
                            disabled
                            className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Partai</label>
                        <select
                            value={data.partai_id}
                            onChange={(e) => setData('partai_id', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Pilih Partai</option>
                            {Partai.map((partai) => (
                                <option key={partai.id} value={partai.id}>
                                    {partai.nama_partai}
                                </option>
                            ))}
                        </select>
                        {errors.partai_id && <div className="text-red-500 text-sm mt-1">{errors.partai_id}</div>}
                    </div>

                    {[
                        ['surat_permohonan', 'Surat Permohonan'],
                        ['surat_dpp', 'Surat DPP'],
                        ['npwp', 'NPWP'],
                        ['suket', 'Surat Keterangan'],
                        ['rekening', 'Rekening'],
                        ['rencana_penggunaan', 'Rencana Penggunaan'],
                        ['irelasi', 'Irelasi'],
                        ['surat_pernyataan', 'Surat Pernyataan'],
                        ['keterangan', 'Keterangan']
                    ].map(([field, label]) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input
                                type="text"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
                        </div>
                    ))}

                    <div className="flex justify-end mt-4">
                        <PrimaryButton type="submit" disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
