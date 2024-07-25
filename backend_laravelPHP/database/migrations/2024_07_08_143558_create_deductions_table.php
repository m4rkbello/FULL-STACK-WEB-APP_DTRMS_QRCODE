<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeductionsTable extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('deductions')) {
            Schema::create('deductions', function (Blueprint $table) {
                $table->id();
                $table->string('deduction_name', 255)->nullable();
                $table->decimal('deduction_amount', 10, 2)->nullable();
                $table->string('deduction_description', 255)->nullable();
                $table->integer('deduction_status_id')->nullable();;
                $table->integer('deduction_created_by')->nullable();
                $table->integer('deduction_updated_by')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('deductions');
    }
}
