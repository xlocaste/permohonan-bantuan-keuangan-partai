import { Link } from '@inertiajs/react';
import { FaSignOutAlt } from "react-icons/fa";

export default function AuthenticatedLayout({ user, children }) {
    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
                <div className="p-4 text-xl font-bold text-center">
                    <p>Dashboard</p>
                    <p>{user?.name}</p>
                </div>
                <nav className="flex flex-col p-4 space-y-6 text-center">
                    {user?.roles?.some(role => role.name === 'admin') && (
                        <>
                            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Register
                            </Link>
                            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Data Register
                            </Link>
                            <Link href="/users" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Users
                            </Link>
                            <Link href="/roles" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Permohonan Bantuan Keuangan
                            </Link>
                            <Link href="/settings" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Laporan
                            </Link>
                        </>
                    )}

                    {user?.roles?.some(role => role.name === 'verifikator') && (
                        <>
                            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Dashboard
                            </Link>
                            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Profile
                            </Link>
                            <Link href="/roles" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Data Permohonan Bantuan Keuangan
                            </Link>
                        </>
                    )}

                    {user?.roles?.some(role => role.name === 'anggota') && (
                        <>
                            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Dashboard
                            </Link>
                            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Profile
                            </Link>
                            <Link href="/roles" className="hover:bg-gray-700 px-3 py-2 rounded border-b border-gray-700">
                                Permohonan Bantuan Keuangan
                            </Link>
                        </>
                    )}
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100">
                <div className='flex justify-between items-center w-full bg-white p-6'>
                    <p className='w-full text-center font-bold text-xl'>Aplikasi Permohonan Bantuan Keuangan Parpol</p>
                    <div>
                        <Link href={route('logout')} method="post" as="button" className="flex justify-end w-full">
                            <FaSignOutAlt />
                        </Link>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
