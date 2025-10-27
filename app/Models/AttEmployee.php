<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class AttEmployee extends Model
{
    protected $fillable = [
        'att_id',
        'emp_id',
        'is_present',
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'atte';
            $model->id = IdGenerator::generate(['table' => 'att_employees', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
        });
    }

    public function employees(){
        return $this->hasOne(Employee::class, 'id', 'emp_id');
    }
    public function attendances(){
        return $this->hasOne(Attendance::class, 'id','att_id');
    }
}
