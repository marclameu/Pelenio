angular.module('pelenio').controller('resumoFinanceiroController', function($scope, nome, temporada, valorvalorTotalUsuarios){
	$scope.nome = nome;
	$scope.temporada = temporada;
	$scope.valorvalorTotalUsuarios = valorvalorTotalUsuarios;
});