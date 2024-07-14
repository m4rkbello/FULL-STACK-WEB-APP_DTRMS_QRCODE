<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\HasMany;

class Deduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'deduction_amount',
        'deduction_name',
        'deduction_description',
        'deduction_created_by',
        'deduction_updated_by',
    ];





}
