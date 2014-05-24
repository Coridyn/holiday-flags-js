'use strict';

var totalLights = 50,
	colCount = 7;

angular.module('clientApp').service('FlagService', function($http) {
	var flag = null;

	this.initFlag = function() {
		var rowCount = Math.floor(totalLights / colCount),
			flag = [];

		for (var i = 0; i < rowCount; i++) {
			var row = [];
			for (var j = 0; j < 7; j++) {
				row.push('#000');
			}
			flag.push(row);
		};

		return flag;
	};

	this.getFlag = function() {
		if (!flag) {
			flag = this.initFlag();
		}
		return flag;
	};

	this.flatFlag = function(flag) {
		var flatFlag = [];
		flatFlag.push('#000000');

		for (var i = 0; i < flag.length; i++) {
			var row = flag[i].concat();

			if (i % 2 == 1) {
				row.reverse();
			}
			flatFlag = flatFlag.concat(row);
		}

		return flatFlag;
	};

});

angular.module('clientApp').controller('MainCtrl', function($scope, $http, FlagService) {
	$scope.flag = FlagService.getFlag();
	$scope.color = "#ff0000";

	$http.get('/flags')
		.success(function(data) {
			$scope.flags = data;
		});

	$scope.updateHolidayLights = function(flag) {
		var flatFlag = FlagService.flatFlag(flag);

		console.log(flatFlag);

		$http.post('/lights', {
			flag: flatFlag
		}).success(function(data) {
			console.log('OK!', data);
		}).error(function() {
			alert('FAIL!');
		});
	};

	$scope.setCurrentFlag = function(flag) {
		$scope.selectedFlag = flag;

		var lights = flag.lights;
		if (!lights) {
			lights = FlagService.getFlag();
		} else {
			console.log(lights);
		}

		$scope.flag = lights;

		$scope.updateHolidayLights(lights)
	};

	$scope.save = function(flag) {
		$http.put('/flag', {
			name: flag.name,
			lights: $scope.flag
		}).success(function() {
			console.log('put ok');
		}).error(function() {
			console.log('put fail');
		})

	};
	
	$scope.setColor = function(row, col, color){
		$scope.flag[row][col] = color;
	}
});