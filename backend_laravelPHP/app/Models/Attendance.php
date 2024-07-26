<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendance_employee_id',
        'attendance_note',
        'attendance_time_in',
        'attendance_time_out',
        'attendance_status_id',
    ];

    protected $cast = [
        'attendance_time_in' => 'datetime',
        'attendance_time_out' => 'datetime',
    ];

    public function employee(){
        return $this->belongsTo(Employee::class, 'attendance_employee_id');
    }

}
