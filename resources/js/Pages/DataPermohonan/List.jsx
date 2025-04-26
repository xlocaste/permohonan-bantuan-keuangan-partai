import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

export default function ListDataPermohonan({ auth, dataPermohonan }) {
    console.log(dataPermohonan)
    const handlePageChange = (url) => {
        if (url) {
            router.visit(url);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Permohonan" />

            <div className="py-8 max-w-[940px] m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    <div className='flex justify-end m-4'>
                        <PrimaryButton>
                            <Link href={route('data-permohonan.create')}>
                                + TAMBAH PERMOHONAN
                            </Link>
                        </PrimaryButton>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className="min-w-full bg-white border border-gray-200 rounded">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama Pemohon</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Nama Partai</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Tanggal Permohonan</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Surat Permohonan</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Surat DPP</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Surat Pernyataan</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">NPWP</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Surat Keterangan</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Rekening</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Rencana Penggunaan</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Realisasi</th>
                                    <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">Keterangan</th>
                                    {auth.user && (
                                        <th className="px-4 py-2 border-b text-sm font-semibold text-center text-gray-700">ACTION</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {dataPermohonan.data.length > 0 ? (
                                    dataPermohonan.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.user?.name || '-'}</td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.partai?.nama_partai || '-'}</td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.tanggal_permohonan}</td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">
                                                {item.surat_permohonan ? (
                                                    <a href={`storage/${item.surat_permohonan}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">
                                                {item.surat_dpp ? (
                                                    <a href={`storage/${item.surat_dpp}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">
                                                {item.surat_pernyataan ? (
                                                    <a href={`storage/${item.surat_pernyataan}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.npwp}</td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">
                                                {item.suket ? (
                                                    <a href={`storage/${item.suket}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.rekening}</td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">
                                                {item.rencana_penggunaan ? (
                                                    <a href={`storage/${item.rencana_penggunaan}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">
                                                {item.irelasi ? (
                                                    <a href={`storage/${item.irelasi}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.keterangan}</td>
                                            {auth.user && (
                                                <td className="px-4 py-1 border-b text-center">
                                                    <div className='flex gap-2 justify-center'>
                                                        <Link
                                                            href={route('data-permohonan.edit', item.id)}
                                                            className='text-yellow-500'
                                                        >
                                                            <FaRegEdit />
                                                        </Link>
                                                        <Link
                                                            as="button"
                                                            className="text-red-400"
                                                            onClick={() => {
                                                                if (confirm('Yakin ingin menghapus permohonan ini?')) {
                                                                    router.delete(route('data-permohonan.destroy', item.id));
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
                                        <td colSpan="12" className="px-4 py-4 text-center text-gray-500">
                                            Tidak ada data permohonan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
