<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'payroll_total_amount',
        'payroll_details',
        'payroll_description',
        'payroll_department_id',
        'payroll_status_id',
        'payroll_employee_id',
        'payroll_rate_id',
        'payroll_deduction_id',
        'payroll_overtime_id',
        'payroll_created_by',
        'payroll_updated_by',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'payroll_employee_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'payroll_department_id');
    }

    public function rate()
    {
        return $this->belongsTo(Rate::class, 'payroll_rate_id');
    }

    public function deduction()
    {
        return $this->hasMany(Deduction::class, 'payroll_deduction_id');
    }

    public function overtime()
    {
        return $this->hasMany(Overtime::class, 'payroll_overtime_id');
    }
}
