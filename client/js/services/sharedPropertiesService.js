angular.module('pelenio').factory('sharedPropertiesService', function(){
	//Serviço utilizado apenas para compartilhas atributos
	var seasonId = null;
	var _setSeasonId = function(id){
		seasonId = id;
	}

	var _getSeasonId = function(){
		return seasonId;
	}

	return{
		setSeasonId: _setSeasonId,

		getSeasonId: _getSeasonId
	}
});