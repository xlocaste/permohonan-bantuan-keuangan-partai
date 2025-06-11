import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div
                className="flex justify-center items-center min-h-screen bg-center bg-cover selection:bg-red-500 selection:text-white"
                style={{
                    backgroundImage: "url('/images/bg-lp.jpg')",
                }}
            >
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <div className='flex flex-col items-center justify-center mt-36'>
                        <div className='flex flex-col justify-center items-center leading-none px-96'>
                            <p className='font-sans font-extrabold text-6xl m-0'>BANTUPOL</p>
                            <p className='text-xs text-center mt-2 mb-6'><a className='italic'>Sistem Permohonan Bantuan Keuangan Partai Politik</a> - <a className='font-bold'>BANTUPOL</a> adalah aplikasi digital yang memfasilitasi permohonan, pengajuan, dan pengelolaan bantuan keuangan bagi partai politik secara cepat, transparan, dan akuntabel.</p>
                        </div>
                        {auth.user ? (
                            <SecondaryButton>
                                <Link
                                    href={route('dashboard')}>
                                    Dashboard
                                </Link>
                            </SecondaryButton>
                        ) : (
                            <div className='flex gap-2'>
                                <SecondaryButton>
                                    <Link
                                        href={route('login')}>
                                        Log in
                                    </Link>
                                </SecondaryButton>
                                <SecondaryButton>
                                    <Link
                                        href={route('register')}>
                                        Register
                                    </Link>
                                </SecondaryButton>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Surat Permohonan</h2>
                            <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                            <li>Diajukan oleh pengurus partai politik tingkat daerah kepada bupati/wali kota.</li>
                            <li>Ditembuskan ke Ketua KPU kabupaten/kota dan Kepala Badan Kesbangpol.</li>
                            <li>Ditandatangani oleh Ketua dan Sekretaris (atau sebutan lain).</li>
                            <li>Menggunakan kop surat dan cap stempel partai politik.</li>
                            </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Kelengkapan Administrasi</h2>
                            <ul className="list-decimal pl-5 text-xs text-gray-700 space-y-1">
                            <li>SK DPP tentang susunan pengurus DPC yang dilegalisir.</li>
                            <li>Fotokopi surat keterangan NPWP.</li>
                            <li>Surat autentifikasi hasil perolehan suara dan kursi dari KPU.</li>
                            <li>Nomor rekening partai dari bank yang bersangkutan.</li>
                            </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Penggunaan & Pertanggungjawaban</h2>
                            <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                            <li>Rencana penggunaan dana diprioritaskan untuk pendidikan politik.</li>
                            <li>Laporan realisasi dana tahun sebelumnya, telah diperiksa BPK.</li>
                            <li>Surat pernyataan tanggung jawab formil dan materiil oleh Ketua, Sekretaris, dan Bendahara, bermaterai dan berkop surat.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
