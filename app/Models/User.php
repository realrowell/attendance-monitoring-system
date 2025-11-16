<?php

namespace App\Models;

use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    public const USER_STAT_ACTIVE = 'active';
    public const USER_STAT_INACTIVE = 'inactive';
    public const USER_STAT_ARCHIVE = 'archive';

    use HasFactory, Notifiable;
    protected $primaryKey = 'id';
    public $incrementing = false;     // VERY IMPORTANT
    protected $keyType = 'string';    // VERY IMPORTANT

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'user_status'
    ];
    // public $incrementing = false;

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $prefix = 'usr';
            $model->id = IdGenerator::generate(['table' => 'users', 'length' => 30, 'prefix' =>$prefix.str()->random(23)]);
        });
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public static function userStatusOptions(){
        return [
            self::USER_STAT_ACTIVE => 'Active',
            self::USER_STAT_INACTIVE => 'Inactive',
            self::USER_STAT_ARCHIVE => 'Archive'
        ];
    }
}
