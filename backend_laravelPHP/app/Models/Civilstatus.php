<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Civilstatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'civil_status_title',
        'civil_status_description',
        'civil_status_id',
    ];


    public function employees() // Define the inverse relationship here
    {
        return $this->hasMany(Employee::class, 'employee_civil_status_id');
    }
}
