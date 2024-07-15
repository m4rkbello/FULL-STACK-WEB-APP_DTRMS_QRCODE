<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    protected $fillable = [
        'rate_amount_per_day',
        'rate_name',
        'rate_details',
        'rate_description',
        'rate_status_id',
        'rate_department_id',
        'rate_created_by',
        'rate_updated_by',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'id');
    }
}
