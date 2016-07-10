angular.module('pelenio').controller('resumoFinanceiroController', function($scope, nome, temporada, valorvalorTotalUsuarios, valorTotalDiaristas){
	$scope.nome = nome;
	$scope.temporada = temporada;
	$scope.valorvalorTotalUsuarios = valorvalorTotalUsuarios;
	$scope.valorTotalDiaristas = valorTotalDiaristas;
	$scope.total = valorvalorTotalUsuarios + valorTotalDiaristas;
	console.log(valorTotalDiaristas);
});