<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'student_id',
        'student_firstname',
        'student_middlename',
        'student_lastname',
        'student_suffix',
        'student_email_address',
        'student_age',
        'student_sex',
        'student_birthdate',
        'student_place_of_birth',
        'student_address',
        'student_temporary_address',
        'student_contact_no',
        'student_year_level_id',
        'student_course_id',
        'student_ethnicity',
        'student_religion',
        'student_nursery_school_name',
        'student_nursery_school_address',
        'student_nursery_year_graduated',
        'student_elementary_school_name',
        'student_elementary_school_address',
        'student_elementary_year_graduated',
        'student_junior_high_school_name',
        'student_junior_high_school_address',
        'student_junior_high_school_year_graduated',
        'student_senior_high_school_name',
        'student_senior_high_school_address',
        'student_senior_high_school_year_graduated',
        'student_college_school_name',
        'student_college_school_address',
        'student_college_school_year_graduated',
        'student_techvoc_name',
        'student_techvoc_address',
        'student_techvoc_year_graduated',
        'student_fathername',
        'student_fathername_occupation',
        'student_fathername_contact_no',
        'student_mothername',
        'student_mothername_occupation',
        'student_mothername_contact_no',
        'status_id',
    ];







}
