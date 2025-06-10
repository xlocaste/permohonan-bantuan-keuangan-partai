import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { LuFileInput } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { MdChecklistRtl, MdOutlineSpaceDashboard } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";

export default function AuthenticatedLayout({ user, children }) {
    console.log(user)
    return (
        <div className="min-h-screen flex">
            <aside
                className="fixed flex flex-col w-64 min-h-screen bg-center bg-no-repeat bg-cover selection:text-white"
                style={{
                    backgroundImage: `
                    linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(31, 41, 55, 0.8), rgba(156, 163, 175, 0.5)),
                    url('/images/siluet.png')
                    `,
                    backgroundSize: '',
                    backgroundPosition: 'center',
                }}
            >

                <div className="flex flex-col justify-center items-center p-4 text-xl font-bold">
                    <ApplicationLogo className="w-10 h-10 text-black" />
                </div>
                <nav className="flex flex-col space-y-1 text-gray-300 font-semibold mt-10">
                    {user?.roles?.some(role => role.name === 'admin') && (
                        <>
                            <Link href={route('register.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <MdChecklistRtl /> Register
                            </Link>
                            <Link href={route('partai.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <VscOrganization /> Partai
                            </Link>
                            <Link href={route('user.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                                <FaRegUser /> Users
                            </Link>
                            <Link href={route('data-permohonan.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <LuFileInput /> Data Permohonan Bantuan Keuangan
                            </Link>
                            <Link href={route('laporan.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <HiOutlineDocumentReport /> Laporan
                            </Link>
                        </>
                    )}

                    {user?.roles?.some(role =>
                        ['verifikator-1', 'verifikator-2', 'verifikator-3', 'verifikator-4', 'verifikator-5', 'verifikator-6', 'verifikator-7'].includes(role.name)
                    ) && (
                        <>
                            <Link href={route('dashboard')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <MdOutlineSpaceDashboard /> Dashboard
                            </Link>
                            <Link href={route('profile.edit')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <FaRegUser /> Profile
                            </Link>
                            <Link href={route('data-permohonan.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                                <LuFileInput /> Data Permohonan Bantuan Keuangan
                            </Link>
                        </>
                    )}

                    {user?.roles?.some(role => role.name === 'anggota') && (
                        <>
                            <Link href={route('dashboard')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                                <LuLayoutDashboard /> Dashboard
                            </Link>
                            <Link href={route('profile.edit')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                                <FaRegUser /> Profile
                            </Link>
                            <Link href={route('data-permohonan.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <LuFileInput /> Data Permohonan Bantuan Keuangan
                            </Link>
                            <Link href={route('aktivitas.index')} className="flex items-center gap-2 px-3 py-2 text-lg hover:text-xl transition-all duration-300 border-gray-700">
                               <LuCalendarClock /> Log Aktivitas
                            </Link>
                        </>
                    )}
                    <p className='absolute bottom-2 w-full uppercase flex items-center justify-center'>{user?.name}</p>
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100 ml-64">
                <div className='flex justify-between items-center w-full bg-white p-6'>
                    <p className='w-full text-center font-bold text-xl'>Aplikasi Permohonan Bantuan Keuangan Parpol</p>
                    <div>
                        <Link href={route('logout')} method="post" as="button" className="flex justify-between items-center w-full space-x-2">
                            <FaSignOutAlt className='text-gray-500'/><p className='font-bold text-gray-500'> Keluar</p>
                        </Link>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
