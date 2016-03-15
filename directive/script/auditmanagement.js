define(["app",
		"directive-allorders",
		"directive-verify"
	],function(app){
		app.directive("lmauditmanagement",[function(){
			return {
				restrict:"E",
				templateUrl:"../directive/html/auditmanagement.html",
				link:function($scope,$element,$attrs){
					$scope.showStep = 0;


					$scope.$on('order.detail',function(){
						$scope.showStep = 1;
					});

					$scope.$on('order.list',function(){
						$scope.showStep = 0;
					});
				}
			}
		}]);
	}
	);