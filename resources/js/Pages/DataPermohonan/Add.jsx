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
                            className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
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

                    <div className='flex space-x-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surat Permohonan</label>
                            <input
                                type="file"
                                onChange={(e) => setData('surat_permohonan', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            {errors.surat_permohonan && (
                                <div className="text-red-500 text-sm mt-1">{errors.surat_permohonan}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surat DPP</label>
                            <input
                                type="file"
                                onChange={(e) => setData('surat_dpp', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            {errors.surat_dpp && <div className="text-red-500 text-sm mt-1">{errors.surat_dpp}</div>}
                        </div>
                    </div>

                    <div className='flex space-x-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surat Pernyataan</label>
                            <input
                                type="file"
                                onChange={(e) => setData('surat_pernyataan', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            {errors.surat_pernyataan && (
                                <div className="text-red-500 text-sm mt-1">{errors.surat_pernyataan}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rencana Penggunaan</label>
                            <input
                                type="file"
                                onChange={(e) => setData('rencana_penggunaan', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            {errors.rencana_penggunaan && (
                                <div className="text-red-500 text-sm mt-1">{errors.rencana_penggunaan}</div>
                            )}
                        </div>
                    </div>

                    <div className='flex space-x-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Irelasi</label>
                            <input
                                type="file"
                                onChange={(e) => setData('irelasi', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            {errors.irelasi && <div className="text-red-500 text-sm mt-1">{errors.irelasi}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surat Keterangan</label>
                            <input
                                type="file"
                                onChange={(e) => setData('suket', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                            {errors.suket && <div className="text-red-500 text-sm mt-1">{errors.suket}</div>}
                        </div>
                    </div>


                    {[
                        ['npwp', 'NPWP'],
                        ['rekening', 'Rekening'],
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
