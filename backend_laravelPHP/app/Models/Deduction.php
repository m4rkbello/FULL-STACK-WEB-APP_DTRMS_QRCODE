<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'deduction_amount',
        'deduction_name',
        'deduction_description',
        'deduction_status_id',
        'deduction_created_by',
        'deduction_updated_by',
    ];

    public function payroll()
    {
        return $this->belongsTo(Payroll::class, 'payroll_deduction_id');
    }
}
