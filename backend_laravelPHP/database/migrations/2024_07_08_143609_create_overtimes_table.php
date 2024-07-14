<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('overtimes', function (Blueprint $table) {
            $table->id();
            $table->decimal('overtime_hour', 10, 2); // 10 digits total, 2 decimal places
            $table->decimal('overtime_rate_per_hour', 10, 2);
            $table->string('overtime_name',255);
            $table->string('overtime_description',255);
            $table->integer('overtime_created_by',11)->nullable();
            $table->integer('overtime_updated_by',11)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('overtimes');
    }
};
