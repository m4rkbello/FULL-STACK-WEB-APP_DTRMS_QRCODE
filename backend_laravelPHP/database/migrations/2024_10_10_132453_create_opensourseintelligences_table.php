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
        Schema::create('opensourseintelligences', function (Blueprint $table) {
            $table->id(); // This creates an auto-incrementing primary key called id
            $table->string('osint_public_ip', 255); // Change to string for IP addresses
            $table->decimal('osint_latitude', 10, 8); // Corrected to decimal
            $table->decimal('osint_longitude', 11, 8); // Corrected to decimal
            $table->foreignId('osint_employee_id')->nullable()->constrained('employees');
            $table->foreignId('osint_user_id')->nullable()->constrained('users');
            $table->integer('osint_status_id')->nullable();
            $table->unsignedBigInteger('osint_created_by')->nullable();
            $table->unsignedBigInteger('osint_updated_by')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opensourceintelligences');
    }
};
