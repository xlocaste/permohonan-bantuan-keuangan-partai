<?php

namespace App\Providers;

use App\Models\DataPermohonan;
use App\Observers\PermohonanBantuanObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        DataPermohonan::observe(PermohonanBantuanObserver::class);
    }
}
