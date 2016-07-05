angular.module('pelenio').service('matchService', function($http, config){
	_getMatchsBySeasonId = function(seasonId){
		return $http.get(config.baseUrlApi + '/match/getMatchBySeasonId/' + seasonId);
	};

	_deleteMatch = function(id){
		return $http.delete(config.baseUrlApi + '/match/'+id)
	}

	return{
		getMatchsBySeasonId: 	_getMatchsBySeasonId,
		deleteMatch: 			_deleteMatch
	}
});