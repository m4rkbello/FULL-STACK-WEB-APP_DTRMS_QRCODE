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
        Schema::create('civilstatuses', function (Blueprint $table) {
            $table->id();
            $table->string('civil_status_title', 255)->nullable();
            $table->string('civil_status_description', 255)->nullable();
            $table->integer('deduction_status_id')->nullable();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('civilstatuses');
    }
};
