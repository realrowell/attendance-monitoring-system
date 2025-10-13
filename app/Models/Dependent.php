<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class Dependent extends Model
{
    public const DEPENDENT_SPOUSE = 'spouse';
    public const DEPENDENT_CHILD = 'child';
    public const DEPENDENT_PARENT = 'parent';
    public const DEPENDENT_OTHER = 'other';

    protected $fillable = [
        'emp_id',
        'depd_type',
        'full_name',
        'is_active'
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'depd';
            $model->id = IdGenerator::generate(['table' => 'dependents', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
        });
    }

    public static function dependentTypeOptions(){
        return [
            self::DEPENDENT_SPOUSE => 'Spouse',
            self::DEPENDENT_CHILD => 'Child',
            self::DEPENDENT_PARENT => 'Parent',
            self::DEPENDENT_OTHER => 'Other',
        ];
    }
}
