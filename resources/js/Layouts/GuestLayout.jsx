import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-center bg-cover selection:bg-red-500 selection:text-white"
            style={{
                backgroundImage: "url('/images/bg-lp.jpg')",
            }}
        >
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
