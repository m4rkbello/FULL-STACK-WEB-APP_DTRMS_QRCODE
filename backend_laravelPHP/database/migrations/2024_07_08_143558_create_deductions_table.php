<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeductionsTable extends Migration
{
    public function up(): void
    {
        Schema::create('deductions', function (Blueprint $table) {
            $table->id();
            $table->string('deduction_name', 255)->nullable();
            $table->decimal('deduction_amount', 10, 2)->nullable();
            $table->string('deduction_description', 255)->nullable();
            $table->unsignedBigInteger('deduction_created_by')->nullable();
            $table->unsignedBigInteger('deduction_updated_by')->nullable();
            $table->timestamps();
        });

        // Ensure 'id' column is primary key and indexed
        Schema::table('deductions', function (Blueprint $table) {
            $table->primary('id');
            $table->index('id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deductions');
    }
}
