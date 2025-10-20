<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Employee extends Model
{
    public const EMP_AGENCY = 'agency';
    public const EMP_BIOSEED = 'bioseed';

    protected $fillable = [
        'user_id',
        'dept_id',
        'emp_class',
        'emp_details_id',
        'is_active'
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'emp';
            $model->id = IdGenerator::generate(['table' => 'employees', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
        });
        static::creating(function ($model) {
            if (empty($model->public_id)) {
                $model->public_id = (string) Str::uuid();
            }
        });
    }

    public static function empClassOptions(){
        return [
            self::EMP_AGENCY => 'Agency',
            self::EMP_BIOSEED => 'Bioseed'
        ];
    }

    public function empDetails(){
        return $this->hasOne(EmpDetail::class, 'id', 'emp_details_id');
    }

    public function departments(){
        return $this->hasOne(Department::class, 'id', 'dept_id');
    }

    public function dependents(){
        return $this->hasMany(Dependent::class, 'emp_id','id');
    }
}
