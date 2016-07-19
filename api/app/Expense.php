<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
	protected $fillable = [
        'description', 'value', 'season_id', 'date_payment'
    ];

    public function season(){
    	return $this->belongsTo('App\Season');
    }

    public function getExpensesBySeasonId($seasonId)
    {
    	return $this->where('season_id', $seasonId)->get();
    }
}
