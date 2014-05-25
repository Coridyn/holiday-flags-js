'use strict';

var totalLights = 50,
	colCount = 7;

angular.module('clientApp').service('FlagService', function($http) {
	var flag = null;
	
	this.cloneFlag = function(flag){
		var newFlag = [];
		for (var i = 0; i < flag.length; i++){
			newFlag.push(flag[i].concat());
		}
		return newFlag;
	}

	this.initFlag = function() {
		var rowCount = Math.floor(totalLights / colCount),
			flag = [];

		for (var i = 0; i < rowCount; i++) {
			var row = [];
			for (var j = 0; j < 7; j++) {
				row.push('#000000');
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
});

angular.module('clientApp').controller('MainCtrl', function($scope, $http, FlagService) {
	var savedFlags = [];
	
	$scope.flag = FlagService.getFlag();
	$scope.flagName = '';
	$scope.color = '#ff0000';
	$scope.colors = [
		'#ff0000',
		'#00ce00',
		'#0000ff',
		'#ffffff',
		'#000000',
		'#cccccc',
		'#ffde00',
		'#ff8500',
		'#00eaf7'
	];

	$scope.flags = [];
	$http.get('/flags')
		.success(function(data) {
			$scope.flags = data;
		});

	$scope.updateHolidayLights = function(flag) {
		$http.post('/lights', {
			flag: flag
		}).success(function(data) {
			console.log('OK!', data);
		}).error(function() {
			console.log('FAIL!');
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
		// $http.put('/flag', {
		// 	name: flag.name,
		// 	lights: $scope.flag
		// }).success(function() {
		// 	console.log('put ok');
		// }).error(function() {
		// 	console.log('put fail');
		// });
		
		var newFlag = {
			name: $scope.flagName,
			lights: FlagService.cloneFlag($scope.flag)
		};
		savedFlags.push(newFlag);
		
		// Update the list of flags
		$scope.flags.unshift(newFlag);
	};

	$scope.newFlag = function() {
		angular.forEach($scope.flag, function(row, rowIndex) {
			angular.forEach(row, function(item, cellIndex) {
				$scope.flag[rowIndex][cellIndex] = '#000000';
			});
		});
		
		$scope.flagName = '';
	};

	$scope.setColor = function(row, col, color) {
		$scope.flag[row][col] = color;
	}
	
	$scope.logFlags = function(){
		console.log(angular.toJson($scope.flags, true));
	}
});