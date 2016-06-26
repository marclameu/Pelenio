angular.module('pelenio').service('matchService', function($http, config){
	_getMatchsBySeasonId = function(seasonId){
		return $http.get(config.baseUrlApi + '/match/getMatchBySeasonId/' + seasonId);
	};

	return{
		getMatchsBySeasonId: _getMatchsBySeasonId
	}
});