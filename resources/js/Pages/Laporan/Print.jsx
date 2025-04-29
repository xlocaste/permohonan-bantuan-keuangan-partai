import React, { useEffect } from 'react';

export default function Print({ permohonan }) {
    useEffect(() => {
        window.print();
    }, []);

    return (
        <div className="p-8 font-sans">
            <table className="w-full border border-gray-300">
                <tbody>
                    <tr>
                        <th className="text-left border px-4 py-2 w-1/3">Nama Pengguna</th>
                        <td className="border px-4 py-2">{permohonan.user?.name || '-'}</td>
                    </tr>
                    <tr>
                        <th className="text-left border px-4 py-2">Nama Partai</th>
                        <td className="border px-4 py-2">{permohonan.partai?.nama_partai || '-'}</td>
                    </tr>
                    <tr>
                        <th className="text-left border px-4 py-2">Tanggal Permohonan</th>
                        <td className="border px-4 py-2">{permohonan.tanggal_permohonan}</td>
                    </tr>
                    <tr>
                        <th className="text-left border px-4 py-2">NPWP</th>
                        <td className="border px-4 py-2">{permohonan.npwp}</td>
                    </tr>
                    <tr>
                        <th className="text-left border px-4 py-2">Rekening</th>
                        <td className="border px-4 py-2">{permohonan.rekening}</td>
                    </tr>
                    <tr>
                        <th className="text-left border px-4 py-2">Keterangan</th>
                        <td className="border px-4 py-2">{permohonan.keterangan}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
