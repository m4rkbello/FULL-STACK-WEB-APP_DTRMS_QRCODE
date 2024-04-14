<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'img_name',
        'img_status_id',
        'img_user_id',
        'img_emp_id',
    ];

    public function employee(){
        return $this->belongsTo(Employee::class, 'img_emp_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'img_user_id');
    }
}

