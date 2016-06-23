<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
	//number é o número da temporada.
    protected $fillable = [
        'description', 'actual', 'value', 'number', 'start', 'end'
    ];

    public function matches()
    {
    	return $this->hasMany('App\Match');
    }

    public function users(){
    	return $this->belongsToMany('App\User')->withPivot('payment', 'date_payment');
    }
}
