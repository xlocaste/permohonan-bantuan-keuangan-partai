<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $verifikatorRole = Role::firstOrCreate(['name' => 'verifikator']);
        $anggotaRole = Role::firstOrCreate(['name' => 'anggota']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'kontak' => '08123123123',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
            ]
        );

        // $anggota = User::firstOrCreate(
        //     ['email' => 'user@example.com'],
        //     [
        //         'name' => 'User',
        //         'kontak' => '08321321321',
        //         'email' => 'user@example.com',
        //         'password' => Hash::make('password'),
        //     ]
        // );


        // $verifikator = User::firstOrCreate(
        //     ['email' => 'verifikator@example.com'],
        //     [
        //         'name' => 'verifikator',
        //         'kontak' => '08321321321',
        //         'email' => 'verifikator@example.com',
        //         'password' => Hash::make('password'),
        //         ]
        //     );

        // $verifikator->assignRole($verifikatorRole);
        // $anggota->assignRole($anggotaRole);
        $admin->assignRole($adminRole);
    }
}
