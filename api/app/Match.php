<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    protected $fillable = [
        'date_match', 'income', 'value', 'id_season'
    ];

    public function season(){
    	return $this->belongsTo('App\Season');
    }
}
