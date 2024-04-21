<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class department extends Model
{
    use HasFactory;

    protected $fillable = [
        'dept_name',
        'dept_description',
        'dept_status_id',
        'dept_emp_id'
      
    ];

    public function employee(){
        return $this->belongsTo(Employee::class, 'dept_emp_id');
    }

}
