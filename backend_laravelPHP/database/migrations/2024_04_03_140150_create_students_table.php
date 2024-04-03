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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id', 255);
            $table->string('student_firstname', 255);
            $table->string('student_middlename', 255)->nullable();
            $table->string('student_lastname', 255);
            $table->string('student_suffix', 255)->nullable();
            $table->string('student_email_address', 255)->unique();
            $table->integer('student_age');
            $table->string('student_sex', 255);
            $table->date('student_birthdate');
            $table->string('student_place_of_birth', 255);
            $table->string('student_address',255)->nullable();
            $table->string('student_temporary_address', 255)->nullable();
            $table->bigInteger('student_contact_no')->unique();
            $table->integer('student_year_level_id')->nullable();
            $table->integer('student_course_id')->nullable();
            $table->string('student_ethnicity', 255)->nullable();
            $table->string('student_ethnicity', 255)->nullable();
            $table->string('student_religion', 255)->nullable();
            $table->string('student_nursery_school_name', 255)->nullable();
            $table->string('student_nursery_school_address', 255)->nullable();
            $table->date('student_nursery_year_graduated')->nullable();
            $table->string('student_elementary_school_name', 255)->nullable();
            $table->string('student_elementary_school_address', 255)->nullable();
            $table->string('student_elementary_year_graduated', 255)->nullable();
            $table->string('student_junior_high_school_name', 255)->nullable();
            $table->string('student_junior_high_school_address', 255)->nullable();
            $table->string('student_junior_high_school_year_graduated', 255)->nullable();
            $table->string('student_senior_high_school_name', 255)->nullable();
            $table->string('student_senior_high_school_address', 255)->nullable();
            $table->string('student_senior_high_school_year_graduated', 255)->nullable();
            $table->string('student_college_school_name', 255)->nullable();
            $table->string('student_college_school_address', 255)->nullable();
            $table->string('student_college_school_year_graduated', 255)->nullable();
            $table->string('student_techvoc_name', 255)->nullable();
            $table->string('student_techvoc_address', 255)->nullable();
            $table->string('student_techvoc_year_graduated', 255)->nullable();
            $table->string('student_fathername', 255)->nullable();
            $table->string('student_fathername_occupation', 255)->nullable();
            $table->string('student_fathername_contact_no', 255)->nullable();
            $table->string('student_mothername', 255)->nullable();
            $table->string('student_mothername_occupation', 255)->nullable();
            $table->string('student_mothername_contact_no', 255)->nullable();
            $table->integer('status_id')->default(1);
            $table->string('student_learning_reference_no', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
