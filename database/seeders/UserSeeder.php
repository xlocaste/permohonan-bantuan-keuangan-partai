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
        $verifikatorRole1 = Role::firstOrCreate(['name' => 'verifikator-1']);
        $verifikatorRole2 = Role::firstOrCreate(['name' => 'verifikator-2']);
        $verifikatorRole3 = Role::firstOrCreate(['name' => 'verifikator-3']);
        $verifikatorRole4 = Role::firstOrCreate(['name' => 'verifikator-4']);
        $verifikatorRole5 = Role::firstOrCreate(['name' => 'verifikator-5']);
        $verifikatorRole6 = Role::firstOrCreate(['name' => 'verifikator-6']);
        $verifikatorRole7 = Role::firstOrCreate(['name' => 'verifikator-7']);
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


        $verifikator1 = User::firstOrCreate(
            ['email' => 'verifikator1@example.com'],
            [
                'name' => 'verifikator1',
                'kontak' => '08321321321',
                'email' => 'verifikator1@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator2 = User::firstOrCreate(
            ['email' => 'verifikator2@example.com'],
            [
                'name' => 'verifikator2',
                'kontak' => '08321321321',
                'email' => 'verifikator2@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator3 = User::firstOrCreate(
            ['email' => 'verifikator3@example.com'],
            [
                'name' => 'verifikator3',
                'kontak' => '08323323323',
                'email' => 'verifikator3@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator4 = User::firstOrCreate(
            ['email' => 'verifikator4@example.com'],
            [
                'name' => 'verifikator4',
                'kontak' => '08324324324',
                'email' => 'verifikator4@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator5 = User::firstOrCreate(
            ['email' => 'verifikator5@example.com'],
            [
                'name' => 'verifikator5',
                'kontak' => '08325325325',
                'email' => 'verifikator5@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator6 = User::firstOrCreate(
            ['email' => 'verifikator6@example.com'],
            [
                'name' => 'verifikator6',
                'kontak' => '08326326326',
                'email' => 'verifikator6@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator7 = User::firstOrCreate(
            ['email' => 'verifikator7@example.com'],
            [
                'name' => 'verifikator7',
                'kontak' => '08327327327',
                'email' => 'verifikator7@example.com',
                'password' => Hash::make('password'),
                'is_approved' => 1,
                ]
            );

        $verifikator1->assignRole($verifikatorRole1);
        $verifikator2->assignRole($verifikatorRole2);
        $verifikator3->assignRole($verifikatorRole3);
        $verifikator4->assignRole($verifikatorRole4);
        $verifikator5->assignRole($verifikatorRole5);
        $verifikator6->assignRole($verifikatorRole6);
        $verifikator7->assignRole($verifikatorRole7);
        // $anggota->assignRole($anggotaRole);
        $admin->assignRole($adminRole);
    }
}
