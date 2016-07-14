<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    protected $fillable = [
        'date_match', 'income', 'value', 'season_id', 'payment_type'
    ];

    public function season(){
    	return $this->belongsTo('App\Season');
    }

    public function getySeasonId($seasonId)
    {
    	return $this->where('season_id', $seasonId)->get();
    }
}
