<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Permohonan</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="text-sm text-gray-900 p-8 font-sans">
    <div class="flex justify-between border-b-2 border-black pb-2">
        <div>
            <img src="{{ public_path('images/Logo Pem Singkawang.png') }}" alt="" style="height: 120px;">
        </div>
        <div class="text-center mb-4">
            <div class="text-base font-semibold uppercase">PEMERINTAH KOTA SINGKAWANG</div>
            <div class="text-lg font-bold uppercase">BADAN KESATUAN BANGSA DAN POLITIK</div>
            <div class="text-sm mt-1">
                Jalan Dr. Soetomo Nomor 01 A Singkawang Kode Pos 79123 Telp dan Fax (0562) 636989<br>
                Laman: <span class="text-blue-600">www.kesbangpol.singkawangkota.go.id</span> &nbsp;|&nbsp;
                Pos-el: <span class="text-blue-600">kesbangpol@singkawangkota.go.id</span>
            </div>
        </div>
    </div>

    <h2 class="text-xl font-bold text-center mb-6">Laporan Permohonan Terverifikasi</h2>

    <table class="w-full border-collapse border border-gray-400 text-xs">
        <thead class="bg-gray-100">
            <tr>
                <th class="border px-2 py-1">No</th>
                <th class="border px-2 py-1">Nama Pengguna</th>
                <th class="border px-2 py-1">Partai</th>
                <th class="border px-2 py-1">Tanggal Permohonan</th>
                <th class="border px-2 py-1">NPWP</th>
                <th class="border px-2 py-1">Rekening</th>
                <th class="border px-2 py-1">Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($dataPermohonan as $i => $item)
                <tr class="break-inside-avoid">
                    <td class="border px-2 py-1 text-center">{{ $i + 1 }}</td>
                    <td class="border px-2 py-1">{{ $item->user->name ?? '-' }}</td>
                    <td class="border px-2 py-1">{{ $item->partai->nama_partai ?? '-' }}</td>
                    <td class="border px-2 py-1 text-center">{{ $item->tanggal_permohonan }}</td>
                    <td class="border px-2 py-1 text-center">{{ $item->npwp }}</td>
                    <td class="border px-2 py-1 text-center">{{ $item->rekening }}</td>
                    <td class="border px-2 py-1">{{ $item->keterangan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="mt-8 text-right pr-6">
        <p>Singkawang, {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}</p>
        <p class="mt-10 font-semibold">Kepala Badan</p>
    </div>
</body>
</html>
