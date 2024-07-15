<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollsTable extends Migration
{
    public function up(): void
    {
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->string('payroll_details', 255);
            $table->decimal('payroll_total_amount', 10, 2);
            $table->string('payroll_description', 255);
            $table->unsignedBigInteger('payroll_status_id')->nullable();
            $table->unsignedBigInteger('payroll_employee_id')->nullable();
            $table->unsignedBigInteger('payroll_department_id')->nullable();
            $table->unsignedBigInteger('payroll_rate_id')->nullable();
            $table->unsignedBigInteger('payroll_deduction_id')->nullable();
            $table->unsignedBigInteger('payroll_overtime_id')->nullable();
            $table->unsignedBigInteger('payroll_created_by')->nullable();
            $table->unsignedBigInteger('payroll_updated_by')->nullable();
            $table->timestamps();

            $table->foreign('payroll_employee_id')->references('id')->on('employees');
            $table->foreign('payroll_department_id')->references('id')->on('departments');
            $table->foreign('payroll_rate_id')->references('id')->on('rates');
            $table->foreign('payroll_deduction_id')->references('id')->on('deductions');
            $table->foreign('payroll_overtime_id')->references('id')->on('overtimes');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
}
