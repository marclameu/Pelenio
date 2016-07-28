<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Expense;

class ExpenseController extends Controller
{
    protected $_expense;

    public function __construct(Expense $expense){
        $this->_expense = $expense;
    }

    public function getExpensesBySeasonId($seasonId)
    {    	
    	$expenses =  $this->_expense->getExpensesBySeasonId($seasonId);
    	return response()->json($expenses);
    }

    public function salvarPagamento(Request $request)
    {
    	try {
    		$expense = new Expense();
    		$expense->description = $request->input('description');
    		$expense->value = $request->input('value');
    		$expense->season_id = $request->input('season_id');
    		$expense->date_payment = $request->input('data_pagamento');

    		$expense->save();

    		return response()->json(["Mensagem" => "Pagamento criado com sucesso!"]);

    	} catch (Exception $e) {    		
    	}
    }

    public function delete($id){
        $this->_expense->destroy($id);

        return response()->json(["Mensagem" => "Pagamento excluído com sucesso!"]);
    }
}
