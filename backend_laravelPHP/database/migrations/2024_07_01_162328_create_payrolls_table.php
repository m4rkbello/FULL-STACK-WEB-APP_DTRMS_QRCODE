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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->decimal('payroll_total_amount', 10, 2); // 10 digits total, 2 decimal places
            $table->string('payroll_details', 255);
            $table->string('payroll_description', 255);
            $table->string('payroll_department', 255);
            $table->integer('payroll_status_id',11)->nullable();
            $table->integer('payroll_attendance_employee_rate_id',11)->nullable();
            $table->integer('payroll_employee_id',11)->nullable();
            $table->integer('payroll_rate_id',11)->nullable();
            $table->integer('payroll_deduction_id',11)->nullable();
            $table->integer('payroll_overtime_id',11)->nullable();
            $table->integer('payroll_created_by',11)->nullable();
            $table->integer('payroll_updated_by',11)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
