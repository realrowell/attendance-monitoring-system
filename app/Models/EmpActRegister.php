<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class EmpActRegister extends Model
{
    protected $fillable = [
        'activity_id',
        'emp_id',
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'ear';
            $model->id = IdGenerator::generate(['table' => 'emp_act_registers', 'length' => 20, 'prefix' => $prefix . str()->random(10)]);
            if (empty($model->ref)) {
                $model->ref = (string) Str::uuid();
            }
        });
    }

    public function employees()
    {
        return $this->hasOne(Employee::class, 'id', 'emp_id');
    }
    public function activities(){
        return $this->hasOne(Activity::class, 'id', 'activity_id');
    }
}
