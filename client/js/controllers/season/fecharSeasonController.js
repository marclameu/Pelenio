angular.module('pelenio').controller('fecharSeasonController', function($scope, seasonService, ngToast, $location){
	$scope.fecharSeason = function(id){
		console.log(id);
		seasonService.fecharSeason(id).success(function(response){
			ngToast.create(response.Mensagem);
			$location.path('temporada/listar');
		}).error(function(response){
			console.log('Erro => ' + response.Mensagem);
		});
	}
});