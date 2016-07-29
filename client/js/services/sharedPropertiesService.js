angular.module('pelenio').factory('sharedPropertiesService', function(){
	//Serviço utilizado apenas para compartilhas atributos
	var seasonId = null;
	var _setSeasonId = function(id){
		seasonId = id;
	}

	var _getSeasonId = function(){
		return seasonId;
	}

	var _formateDateFromServer = function(strDate, separator){
		d = strDate.split('-');
		return d[2] + separator + d[1] + separator + d[0];
	}

	return{
		setSeasonId: 			_setSeasonId,
		getSeasonId: 			_getSeasonId,
		formateDateFromServer: 	_formateDateFromServer
	}
});