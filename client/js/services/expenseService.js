angular.module('pelenio').factory('expenseService', function($http, config){
	var _getExpensesBySeasonId = function(seasonId){
		return $http.get(config.baseUrlApi + '/expense/getExpensesBySeasonId/' + seasonId);			
	}

	var _salvarPagamento = function(pagamento){
		return $http.post(config.baseUrlApi + '/expense/salvarPagamento', pagamento);
	}

	var _deletarPagamento = function(id){
		return $http.delete(config.baseUrlApi + '/expense/' + id);
	}

	return {
		getExpensesBySeasonId: _getExpensesBySeasonId,
		salvarPagamento: _salvarPagamento,
		deletarPagamento: _deletarPagamento
	}	
});