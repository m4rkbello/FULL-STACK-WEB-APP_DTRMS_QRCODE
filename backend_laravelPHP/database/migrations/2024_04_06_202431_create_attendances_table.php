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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attendance_employee_id')->constrained('employees');
            $table->string('attendance_note');
            $table->dateTime('attendance_time_in');
            $table->dateTime('attendance_time_out');
            $table->integer('attendance_status')->default(1);
            $table->rememberToken();
            $table->timestamps();
        });
    }

 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
