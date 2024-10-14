<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\HasMany;
use Laravel\Sanctum\HasApiTokens;

class Employee extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'employee_firstname',
        'employee_middlename',
        'employee_lastname',
        'employee_extensionname',
        'employee_username',
        'employee_password',
        'employee_email',
        'employee_contact_no',
        'employee_barangay',
        'employee_municipality',
        'employee_province',
        'employee_region',
        'employee_birthdate',
        'employee_position',
        'employee_role',
        'employee_image',
        'employee_qrcode',
        'employee_sss_no',
        'employee_pagibig_no',
        'employee_philhealth_no',
        'employee_tin_no',
        'employee_status_id',
        'employee_civil_status_id',
        'employee_department_id',
    ];

    public function attendances(){
        return $this->hasMany(Attendance::class, 'attendance_employee_id');
    }
    
    public function department()
    {
        return $this->belongsTo(Department::class, 'employee_department_id');
    }

    public function opensourceintelligence(){
        return $this->hasMany(Opensourseintelligences::class, 'osint_employee_id');
    }

    public function civilstatus()
    {
        return $this->belongsTo(Civilstatus::class, 'employee_civil_status_id'); // Correct this line
    }

}
