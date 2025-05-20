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
            </div>
        </>
    );
}
