import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, totalSudahAcc, totalBelumAcc }) {
    console.log(totalSudahAcc)
    console.log("belum acc",totalBelumAcc)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
