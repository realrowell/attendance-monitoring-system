<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class AttDependent extends Model
{
    protected $fillable = [
        'att_id',
        'depd_id',
        'is_present',
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'attd';
            $model->id = IdGenerator::generate(['table' => 'att_dependents', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
        });
    }

    public function dependents(){
        return $this->hasOne(Dependent::class, 'id', 'depd_id');
    }
}
