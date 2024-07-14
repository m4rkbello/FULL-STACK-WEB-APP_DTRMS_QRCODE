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
        Schema::create('rates', function (Blueprint $table) {
            $table->id();
            $table->decimal('rate_per_day', 10, 2); // 10 digits total, 2 decimal places
            $table->string('rate_details',255);
            $table->string('rate_description',255);
            $table->integer('rate_department_id',11)->nullable();
            $table->integer('rate_created_by',11)->nullable();
            $table->integer('rate_updated_by',11)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rates');
    }
};
