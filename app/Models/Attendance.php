<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    public const TYPE_ONSITE = 'on-site';
    public const TYPE_VIRTUAL = 'virtual';

    protected $fillable = [
        'activity_id',
        'date_time',
        'mop',
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'att';
            $model->id = IdGenerator::generate(['table' => 'attendances', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
            $model->ref = IdGenerator::generate(['table' => 'attendances', 'field' => 'ref', 'length' => 15, 'prefix' => date(format: 'ym').str()->random(8)]);
        });
    }

    public static function mopOptions(){
        return [
            self::TYPE_ONSITE => [
                'label' => 'On Site',
                'alt' => ['In Person', 'Face-to-face', 'Offline'],
            ],
            self::TYPE_VIRTUAL => [
                'label' => 'Virtual',
                'alt' => ['Online', 'Remote', 'Live Stream'],
            ],
        ];
    }
}
