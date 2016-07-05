angular.module('pelenio').factory('seasonService', function($http, config){
	_getSeasons = function(){
		return $http.get(config.baseUrlApi + '/seasons');
	};

	_salvarSeason = function(newSeason){
		return $http.post(config.baseUrlApi + '/season', newSeason);
	};

	_getSeason = function(id){
		return $http.get(config.baseUrlApi + '/season/' + id);
	};

	_criarPartida = function(partida)
	{
		return $http.post(config.baseUrlApi + '/season/adicionarPartida', partida);
	}

	return{
		getSeasons: _getSeasons,
		salvarSeason: _salvarSeason,
		getSeason: _getSeason,
		criarPartida: _criarPartida
	};
});