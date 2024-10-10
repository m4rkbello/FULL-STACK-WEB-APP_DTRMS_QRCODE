<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opensourceintelligence extends Model
{
    use HasFactory;

    protected $fillable = [
        'osint_public_ip',
        'osint_latitude',
        'osint_longitude',
        'osint_user_id',
        'osint_employee_id',
        'osint_status_id'
    ];


     // Relationship with the Employee model
     public function employee()
     {
         return $this->belongsTo(Employee::class, 'osint_employee_id');
     }
 
     // Relationship with the User model
     public function user()
     {
         return $this->belongsTo(User::class, 'osint_user_id');
     }




}



