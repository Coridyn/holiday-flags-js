angular.module('clientApp')
.directive('colorDrag', function(){
	return {
		link: function(scope, element, attr){
			
			element.on('mousedown', function(){
				$(this).on('mouseover', 'td', function(e){
					
					// Find the current cell and tell
					// it to update with the current colour.
					var scope = $(e.currentTarget).scope();
					scope.$apply(function(){
						scope.setColor(scope.$parent.$index, scope.$index, scope.color);
					})
				});
			});
			
			element.on('mouseup', function(e){
				// Remove mousemove.
				$(this).off('mouseover');
			});
		}
	};
})