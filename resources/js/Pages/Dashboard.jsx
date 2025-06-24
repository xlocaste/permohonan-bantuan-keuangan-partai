import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, totalSudahAcc, totalBelumAcc }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* === VERIFIKATOR === */}
                        {auth.user?.roles?.some(role =>
                            ['verifikator-1', 'verifikator-2', 'verifikator-3', 'verifikator-4', 'verifikator-5', 'verifikator-6', 'verifikator-7'].includes(role.name)
                        ) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-green-200">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-green-600">Total Sudah ACC</h3>
                                        <p className="mt-2 text-3xl font-bold text-gray-800">{totalSudahAcc}</p>
                                    </div>
                                </div>

                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-red-200">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-red-600">Total Belum ACC</h3>
                                        <p className="mt-2 text-3xl font-bold text-gray-800">{totalBelumAcc}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* === ANGGOTA === */}
                        {auth.user?.roles?.some(role => ['anggota', 'admin'].includes(role.name)) && (
                            <>
                            <div className="px-8 flex justify-end pt-8 items-center space-x-4">
                                <p className='font-bold'>Download Panduan Aplikasi</p>
                                <a
                                    href="/files/PANDUAN APLIKASI PERMOHONAN BANTUAN KEUANGAN PARTAI POLITIK.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md shadow"
                                >
                                    Unduh Format PDF
                                </a>
                            </div>
                            <div className="p-8 space-y-10">
                                {/* Informasi Card */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-white border border-blue-200 shadow-sm sm:rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-blue-600">Ajukan Permohonan</h3>
                                        <p className="mt-2 text-sm text-gray-700">
                                            Ajukan permohonan bantuan dana partai politik sesuai dengan ketentuan yang berlaku dan pastikan semua dokumen lengkap.
                                        </p>
                                    </div>

                                    <div className="bg-white border border-yellow-200 shadow-sm sm:rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-yellow-600">Status Permohonan</h3>
                                        <p className="mt-2 text-sm text-gray-700">
                                            Lihat progres verifikasi permohonan Anda. Permohonan akan diverifikasi oleh 7 verifikator sebelum disetujui.
                                        </p>
                                    </div>

                                    <div className="bg-white border border-green-200 shadow-sm sm:rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-green-600">Notifikasi WhatsApp</h3>
                                        <p className="mt-2 text-sm text-gray-700">
                                            Pastikan nomor kontak Anda aktif agar mendapatkan notifikasi verifikasi langsung melalui WhatsApp.
                                        </p>
                                    </div>
                                </div>

                                {/* Persyaratan Permohonan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-lg font-semibold mb-2">Surat Permohonan</h2>
                                        <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                                            <li>Diajukan oleh pengurus partai politik tingkat daerah kepada bupati/wali kota.</li>
                                            <li>Ditembuskan ke Ketua KPU kabupaten/kota dan Kepala Badan Kesbangpol.</li>
                                            <li>Ditandatangani oleh Ketua dan Sekretaris (atau sebutan lain).</li>
                                            <li>Menggunakan kop surat dan cap stempel partai politik.</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-lg font-semibold mb-2">Kelengkapan Administrasi</h2>
                                        <ul className="list-decimal pl-5 text-xs text-gray-700 space-y-1">
                                            <li>SK DPP tentang susunan pengurus DPC yang dilegalisir.</li>
                                            <li>Fotokopi surat keterangan NPWP.</li>
                                            <li>Surat autentifikasi hasil perolehan suara dan kursi dari KPU.</li>
                                            <li>Nomor rekening partai dari bank yang bersangkutan.</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-lg font-semibold mb-2">Penggunaan & Pertanggungjawaban</h2>
                                        <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                                            <li>Rencana penggunaan dana diprioritaskan untuk pendidikan politik.</li>
                                            <li>Laporan realisasi dana tahun sebelumnya, telah diperiksa BPK.</li>
                                            <li>Surat pernyataan tanggung jawab formil dan materiil oleh Ketua, Sekretaris, dan Bendahara, bermaterai dan berkop surat.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
