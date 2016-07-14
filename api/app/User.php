<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function situations(){
        return $this->hasMany('App\Situation');
    }

    public function seasons(){
        return $this->belongsToMany('App\Season')
                    ->withPivot('payment', 'date_payment', 'payment_type');
    }


    public function getUsers(){
        return User::with(array('situations' => function($q){
                        $q->orderBy('dt_situation', 'DESC');
                          //->limit(1);
                    }))->get();
    }

    public function getByIdWithSituations($id){
       //return User::with('situations')->orderBy('dt_situation', 'DESC')->find($id);
        return User::where('id', '=', $id)
                ->with(array('situations' => function($q){
                                    $q->orderBy('dt_situation', 'DESC');
                            }))->get();
    }

    public function getUsersBySeasonId($seasonId){        
        return $this->with(['seasons' => function($query) use($seasonId){
            $query->where('season_id', '=', array($seasonId));
        }])->get();
    }

    public function getSeasonById($seasonId){
        return $this->seasons()
                    ->where('id', '=', $seasonId)
                    ->first();
    }
}
