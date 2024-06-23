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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_fullname');
            $table->string('employee_email');
            $table->string('employee_contact_no');
            $table->string('employee_position');
            $table->string('employee_role');
            $table->integer('employee_department');
            $table->integer('employee_status')->default(1);
            $table->string('employee_image')->nullable();
            $table->string('employee_qrcode')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
