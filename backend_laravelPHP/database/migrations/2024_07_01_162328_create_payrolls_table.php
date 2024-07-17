<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollsTable extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('payrolls')) {
            Schema::create('payrolls', function (Blueprint $table) {
                $table->id();
                $table->string('payroll_details', 255);
                $table->decimal('payroll_total_amount', 10, 2);
                $table->string('payroll_description', 255);
                $table->unsignedBigInteger('payroll_status_id')->nullable();
                $table->foreignId('payroll_employee_id')->nullable()->constrained('employees');
                $table->foreignId('payroll_department_id')->nullable()->constrained('departments');
                $table->foreignId('payroll_rate_id')->nullable()->constrained('rates');
                $table->foreignId('payroll_deduction_id')->nullable()->constrained('deductions');
                $table->foreignId('payroll_overtime_id')->nullable()->constrained('overtimes');
                $table->unsignedBigInteger('payroll_created_by')->nullable();
                $table->unsignedBigInteger('payroll_updated_by')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
}
