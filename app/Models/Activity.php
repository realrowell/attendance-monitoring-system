<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    public const STATUS_DRAFT = 'drafted';
    public const STATUS_PUBLISHED = 'published';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_ARCHIVED = 'archived';
    public const TYPE_ONSITE = 'on-site';
    public const TYPE_VIRTUAL = 'virtual';
    public const TYPE_HYBRID = 'hybrid';

    protected $fillable = [
        'activity_title',
        'activity_desc',
        'date_time',
        'activity_status',
        'activity_type'
    ];

    public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'act';
            $model->id = IdGenerator::generate(['table' => 'activities', 'length' => 20, 'prefix' =>$prefix.str()->random(10)]);
            $model->reference = IdGenerator::generate(['table' => 'activities', 'field' => 'ref', 'length' => 8, 'prefix' => date(format: 'ym').str()->random(3)]);
        });
    }

    public static function activityStatusOptions(){
        return [
            self::STATUS_DRAFT => [
                'present' => 'Drafting',
                'past' => 'Drafted',
            ],
            self::STATUS_PUBLISHED => [
                'present' => 'Publishing',
                'past' => 'Published',
            ],
            self::STATUS_ARCHIVED => [
                'present' => 'Archiving',
                'past' => 'Archived',
            ],
        ];
    }

    public static function participationTypeOptions(){
        return [
            self::TYPE_ONSITE => [
                'label' => 'On Site',
                'alt' => ['In Person', 'Face-to-face', 'Offline'],
            ],
            self::TYPE_VIRTUAL => [
                'label' => 'Virtual',
                'alt' => ['Online', 'Remote', 'Live Stream'],
            ],
            self::TYPE_HYBRID => [
                'label' => 'Hybrid',
                'alt' => ['Blended', 'Mixed', 'In Person + Online'],
            ]
        ];
    }
}
