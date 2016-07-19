<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
	//number é o número da temporada.
    protected $fillable = [
        'description', 'actual', 'value', 'income', 'number', 'start', 'end', 'total'
    ];

    //functions

    public function getSeasons(){
        return $this->orderBy('actual','DESC')->get();
    }

    public function getByIdWithMatches($id){
        return $this->where('id', '=', $id)
            ->with(array('matches' => function($q){
                            $q->orderBy('date_match', 'DESC');
                    }))->get();
    }

    public function saveAndIncNumber($season){
        $season->number = Season::max('number') + 1;
        $season->save();
    }

    //Relacionamentos

    public function matches()
    {
    	return $this->hasMany('App\Match');
    }

    public function expenses()
    {
        return $this->hasMany('App\Expense');
    }    

    public function users(){
    	return $this->belongsToMany('App\User')->withPivot('payment', 'date_payment', 'payment_type');

        /*
            payment_type?
            0 - Dinheiro
            1 - Cartão
        */
    }
}
