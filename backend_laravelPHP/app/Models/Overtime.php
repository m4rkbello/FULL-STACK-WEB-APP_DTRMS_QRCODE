<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Overtime extends Model
{
    use HasFactory;

    protected $fillable = [
        'overtime_name',
        'overtime_hour',
        'overtime_rate_per_hour',
        'overtime_description',
        'overtime_status_id',
        'overtime_created_by',
        'overtime_updated_by',
    ];

    public function payroll()
    {
        return $this->belongsTo(Payroll::class, 'payroll_overtime_id');
    }
}
