define(["app"],function(app){
	app.directive("lmbatchsearch",function(){
		return {
			restrict:"E",
			templateUrl:"../directive/html/batchsearch.html",
			link:function($scope,$element,$attrs){
				
				//向上一级
				$scope.goback = function(){
					$scope.$emit("goback");
				};
			}
		}
	});
});