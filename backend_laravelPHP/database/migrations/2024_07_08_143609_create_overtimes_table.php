<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('overtimes')) {
            Schema::create('overtimes', function (Blueprint $table) {
                $table->id();
                $table->string('overtime_name', 255)->nullable();
                $table->decimal('overtime_hour', 10, 2)->nullable();
                $table->decimal('overtime_rate_per_hour', 10, 2)->nullable();
                $table->string('overtime_description', 255)->nullable();
                $table->unsignedBigInteger('overtime_status_id')->nullable();
                $table->unsignedBigInteger('overtime_created_by')->nullable();
                $table->unsignedBigInteger('overtime_updated_by')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('overtimes');
    }
};
