<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'dept_name',
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'dept';
            $model->id = IdGenerator::generate(['table' => 'departments', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
        });
    }
}
