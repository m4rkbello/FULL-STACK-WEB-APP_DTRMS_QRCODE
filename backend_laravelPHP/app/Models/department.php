<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_name',
        'department_description',
        'department_status_id',
        'department_employee_id'
    ];

// Define the relationship to the Employee model
public function employees()
{
    return $this->hasMany(Employee::class, 'employee_department_id');
}

}
