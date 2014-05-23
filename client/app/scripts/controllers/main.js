'use strict';

// var FlagCell = function () {
//   this.color = null;
// };

var totalLights = 50,
	colCount = 7;

angular.module('clientApp').service('FlagService', function() {
	var flag;

	this.initFlag = function() {
		var rowCount = Math.floor(totalLights / colCount),
			flag = [];

		for (var i = 0; i < rowCount; i++) {
			var row = [];
			for (var j = 0; j < 7; j++) {
				row.push('#00f62b');
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
	}

});

angular.module('clientApp').controller('MainCtrl', function($scope, $http, FlagService) {
	$scope.flag = FlagService.getFlag();
	$scope.color = "#00f62b";

	$scope.updateHolidayLights = function(flag) {

		var flatFlag = [];
		for (var i = 0; i < flag.length; i++) {
			flatFlag = flatFlag.concat(flag[i]);
		}

		flatFlag.push('#000000');

		console.log('flatFlag', flatFlag);

		$http.post('/lights', {
			flag: flatFlag
		}).success(function(data) {
			console.log('OK!', data);
		}).error(function() {
			alert('FAIL!');
		});
	};
});
