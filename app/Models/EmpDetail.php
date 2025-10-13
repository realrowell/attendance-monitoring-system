<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class EmpDetail extends Model
{
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'suffix',
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'empd';
            $model->id = IdGenerator::generate(['table' => 'employee_details', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
        });
    }

    public static function suffixOptions(){
        return [
            'jr' => 'Jr.',
            'sr' => 'Sr.',
            'ii' => 'II',
            'iii' => 'III',
            'iv' => 'IV',
            'v' => 'V',
            'phd' => 'PhD',
            'md' => 'MD',
            'esq' => 'Esq.',
            'cpa' => 'CPA',
        ];
    }
}
