import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PrimaryButton from '@/Components/PrimaryButton';

export default function List({ auth, register }) {
    console.log("register",register)
    console.log("auth",auth)

    const { message } = usePage().props;

    const { data, setData, post } = useForm({
        action: '',
    });

    const handleVerifikasi = (userId, action) => {
        setData('action', action);
        setData('userId', userId);
    };

    useEffect(() => {
        if (data.action !== '') {
            console.log("Data setelah setData:", data);

            post(route('register.approval', data.userId), {
                onSuccess: (response) => {
                    if (response.is_approved !== undefined) {
                        window.location.href = '/register/user';
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    }, [data]);


    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Verifikasi Pendaftar" />

            <div className="py-8 max-w-7xl m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}
                    <table className="min-w-full bg-white border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Nama</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">NIK</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Nama Partai</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Ketua Partai</th>
                                <th className="px-4 py-2 border-b text-sm font-semibold text-center">Email</th>
                                {!auth.roles?.some(role => role.name === 'anggota') && (
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {register.length > 0 ? (
                                register.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 text-center">
                                        <td className="px-4 py-2 border-b">{item.name}</td>
                                        <td className="px-4 py-2 border-b">{item.nik}</td>
                                        <td className="px-4 py-2 border-b">{item.partai?.nama_partai}</td>
                                        <td className="px-4 py-2 border-b">{item.partai?.nama_ketua}</td>
                                        <td className="px-4 py-2 border-b">{item.email}</td>
                                        {!auth.roles?.some(role => role.name === 'anggota') && (
                                        <td className="px-4 py-2 border-b">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="text-green-600 hover:text-green-800"
                                                    onClick={() => {
                                                        if (confirm('Yakin ingin menyetujui permohonan ini?')) {
                                                            handleVerifikasi(item.id, 'disetujui');
                                                        }
                                                    }}
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => {
                                                        if (confirm('Yakin ingin menghapus pendaftar ini?')) {
                                                            router.delete(route('register.destroy', item.id), {
                                                                onSuccess: () => {
                                                                },
                                                                onError: (errors) => {
                                                                    console.error(errors);
                                                                },
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </td>
                                        )}
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
