<?php

namespace Database\Seeders;

use App\Models\Partai;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PartaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $namaPartai = [
            'Partai Rakyat Sejahtera',
            'Partai Keadilan Nasional',
            'Partai Persatuan Demokrasi',
            'Partai Reformasi Bangsa',
            'Partai Solidaritas Rakyat',
            'Partai Kebangkitan Merdeka',
            'Partai Pemersatu Indonesia',
            'Partai Aksi Nyata',
            'Partai Harapan Baru',
            'Partai Amanat Rakyat',
        ];

        foreach (range(1, 50) as $i) {
            Partai::create([
                'nama_partai' => $faker->randomElement($namaPartai) . ' ' . $faker->unique()->numerify('##'),
                'nama_ketua' => $faker->name(),
                'alamat' => $faker->address(),
            ]);
        }
    }
}
