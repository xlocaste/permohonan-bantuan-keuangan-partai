import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function ListDataPermohonan({ auth, dataPermohonan, notifikasi }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPermohonanId, setSelectedPermohonanId] = useState(null);
    const [pesanPenolakan, setPesanPenolakan] = useState("");

    const handleTolak = () => {
        if (!pesanPenolakan.trim()) {
            alert("Alasan penolakan harus diisi.");
            return;
        }

        router.put(route('data-permohonan.update', selectedPermohonanId), {
            status: 'ditolak',
            alasan_penolakan: pesanPenolakan,
        }, {
            onSuccess: () => {
                setShowModal(false);
                setPesanPenolakan("");
                setSelectedPermohonanId(null);
            },
        });
    };

    console.log(dataPermohonan)
    const handlePageChange = (url) => {
        if (url) {
            router.visit(url);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Daftar Permohonan" />

            {auth?.user?.roles?.some(role => role.name === 'anggota') && (
                notifikasi.length > 0 ? (
                    <ul className="space-y-2">
                        {notifikasi.map((notif, index) => (
                        <li key={index} className="py-4 max-w-[960px] m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                            <p className='flex items-center'><FaCheck className='text-green-600 mr-1'/> {notif.pesan}</p>
                            <p className="text-sm text-gray-500">Status : {notif.status}</p>
                            <p className="text-sm text-gray-500">Pesan :{notif.alasan_penolakan}</p>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div className='py-4 max-w-[960px] m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl'>
                        <p className="text-gray-600">Data masih belum diverifikasi.</p>
                    </div>
                )
            )}

            <div className="py-8 max-w-[960px] m-8 px-4 sm:px-6 lg:px-8 bg-white rounded-xl">
                <div className="overflow-x-auto">
                    {auth?.user?.roles?.some(role => role.name === 'anggota') && (
                    <div className='flex justify-end m-4 mt-0'>
                        <PrimaryButton>
                            <Link href={route('data-permohonan.create')}>
                                + TAMBAH PERMOHONAN
                            </Link>
                        </PrimaryButton>
                    </div>
                    )}

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
                                    {auth.user?.roles?.some(role =>
                                        ['verifikator-1', 'verifikator-2', 'verifikator-3', 'verifikator-4', 'verifikator-5', 'verifikator-6', 'verifikator-7'].includes(role.name)
                                    ) && (
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
                                                {item.realisasi ? (
                                                    <a href={`storage/${item.realisasi}`} target="_blank" className="text-blue-600 hover:text-blue-800">
                                                        Lihat File
                                                    </a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-4 py-1 border-b text-sm text-gray-700 text-center">{item.keterangan}</td>
                                            {auth.user?.roles?.some(role =>
                                                ['verifikator-1', 'verifikator-2', 'verifikator-3', 'verifikator-4', 'verifikator-5', 'verifikator-6', 'verifikator-7'].includes(role.name)
                                            ) && (
                                                <td className="px-4 py-1 border-b text-center">
                                                    <div className='flex gap-2 justify-center'>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Yakin ingin menyetujui permohonan ini?')) {
                                                                    router.post(route('data-permohonan.verifikasi', item.id));
                                                                }
                                                            }}
                                                            className='text-green-500 hover:text-green-700'
                                                        >
                                                            <FaCheck size={20} />
                                                        </button>
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => {
                                                                setSelectedPermohonanId(item.id);
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            <FaTimes size={20} />
                                                        </button>
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
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                    <h2 className="text-lg font-semibold mb-4">Alasan Penolakan</h2>
                                    <textarea
                                        className="w-full border rounded p-2 mb-4"
                                        rows="4"
                                        value={pesanPenolakan}
                                        onChange={(e) => setPesanPenolakan(e.target.value)}
                                        placeholder="Tuliskan alasan penolakan..."
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                            onClick={() => {
                                                setShowModal(false);
                                                setPesanPenolakan("");
                                                setSelectedPermohonanId(null);
                                            }}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                            onClick={handleTolak}
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
