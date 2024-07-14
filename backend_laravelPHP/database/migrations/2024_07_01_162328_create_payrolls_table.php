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
            $table->integer('payroll_status_id')->nullable();
            $table->integer('payroll_employee_id')->nullable();
            $table->integer('payroll_department_id')->nullable();
            $table->integer('payroll_rate_id')->nullable();
            $table->integer('payroll_deduction_id')->nullable();
            $table->integer('payroll_overtime_id')->nullable();
            $table->integer('payroll_created_by')->nullable();
            $table->integer('payroll_updated_by')->nullable();
            $table->timestamps();
            // Foreign Keys
            $table->foreign('payroll_employee_id')->references('id')->on('employees');
            $table->foreign('payroll_department_id')->references('id')->on('departments');
            $table->foreign('payroll_rate_id')->references('id')->on('rates');
            $table->foreign('payroll_deduction_id')->references('id')->on('deductions');
            $table->foreign('payroll_overtime_id')->references('id')->on('overtimes');
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
