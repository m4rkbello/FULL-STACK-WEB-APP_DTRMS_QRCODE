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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('img_name')->nullable();
            $table->integer('img_status_id');
            $table->unsignedBigInteger('img_user_id'); // Use unsignedBigInteger for foreign keys
            $table->unsignedBigInteger('img_emp_id'); // Use unsignedBigInteger for foreign keys
            $table->string('img_url')->nullable();
            $table->foreign('img_user_id')->references('id')->on('users');
            $table->foreign('img_emp_id')->references('id')->on('employees');
            $table->timestamps();
        });

    }
        

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
