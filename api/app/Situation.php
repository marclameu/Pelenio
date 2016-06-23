<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Situation extends Model
{
    protected $fillable = [
        'dt_situation', 'active', 'user_id'
    ];

    public function user(){
    	return $this->belongsTo('App\User');
    }
}
