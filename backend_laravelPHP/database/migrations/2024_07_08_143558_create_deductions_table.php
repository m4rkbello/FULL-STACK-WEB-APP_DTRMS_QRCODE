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
        Schema::create('deductions', function (Blueprint $table) {
            $table->id();
            $table->decimal('deduction_amount', 10, 2); // 10 digits total, 2 decimal places
            $table->string('deduction_name',255);
            $table->string('deduction_description',255);
            $table->integer('deduction_created_by',11)->nullable();
            $table->integer('deduction_updated_by',11)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deductions');
    }
};
