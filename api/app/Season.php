<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
	//number é o número da temporada.
    protected $fillable = [
        'description', 'actual', 'value', 'income', 'number', 'start', 'end', 'total'
    ];

    //Constantes
    public $tipoPagamentoEmDinheiro = 0;
    public $tipoPagamentoCartao     = 1;

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

    public function fecharSeasonPorId($id){
        $season = $this->find($id);
        $season->income =   $season->calculaRendaTotalDinheiro();
        $season->total  =   $season->calculaTotalAbsoluto();

        if($season->update())
            return ["Mensagem" => "Temporada encerrada com sucesso!"];
        else
            return ["Mensagem" => "Erro ao tentar encerrar temporada"];                           
    }

///////////////Funções auxiliares//////////////

    public function totalRecebidoDinheiroUsuarios(){
        $valor = 0;
        foreach($this->users as $user){
            if($user->pivot->payment_type == $this->tipoPagamentoEmDinheiro)
                $valor += $user->pivot->payment;
        }             

        if(is_null($valor) || !is_numeric($valor))
            $valor = 0;   

        return $valor;     
    }

    public function totalRecebidoCartaoUsuarios(){
        $valor = 0;
        foreach($this->users as $user){
            if($user->pivot->payment_type == $this->tipoPagamentoCartao)
                $valor += $user->pivot->payment;
        }             

        if(is_null($valor) || !is_numeric($valor))
            $valor = 0;

        return $valor;
    }

    public function totalRecebidoDinheiroDiarias(){
        $valor = 0;
        foreach($this->matches as $match){
            if($match->payment_type == $this->tipoPagamentoEmDinheiro) 
                $valor  += $match->income;
        }  

        if(is_null($valor) || !is_numeric($valor))
            $valor = 0;

        return $valor;              
    }

    public function totalRecebidoCartaoDiarias(){
        $valor = 0;
        foreach($this->matches as $match){
            if($match->payment_type == $this->tipoPagamentoCartao) 
                $valor  += $match->income;
        }  

        if(is_null($valor) || !is_numeric($valor))
            $valor = 0;

        return $valor;          
    }

    public function totalSaidas(){
        $totalSaidas = 0;
        foreach($this->expenses as $expense){
            $totalSaidas += $expense->value;
        }

        if(is_null($totalSaidas) || !is_numeric($totalSaidas))
            $totalSaidas = 0;

        return $totalSaidas;
    }

    public function calculaRendaTotalDinheiro(){
        return  $this->totalRecebidoDinheiroUsuarios()  +
                $this->totalRecebidoDinheiroDiarias() -
                $this->totalSaidas();
    }

    public function calculaRendaTotalCartao(){
        return  $this->totalRecebidoCartaoUsuarios()  +                
                $this->totalRecebidoCartaoDiarias();                        
    }

    public function calculaTotalAbsoluto(){
        return $this->calculaRendaTotalDinheiro() + 
               $this->calculaRendaTotalCartao();
    }
}
