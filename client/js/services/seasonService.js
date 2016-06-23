angular.module('pelenio').factory('seasonService', function($http){
	_getSeasons = function(){
		return $http.get(config.baseUrlApi + '/seasons');
	};

	_saveSeason = function(newSeason){
		return $http.get(config.baseUrlApi + '/season', newSeason);
	};


	return{
		getSeasons: _getSeasons,
		saveSeason: _saveSeason
	};
});