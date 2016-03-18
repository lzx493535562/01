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

					// 当前服务
					$scope.service = null;

					$scope.$on('service.detail',function(e,args){
						$scope.showStep = 1;
						$scope.service = args;
						console.log('service',$scope.service);

						$scope.$broadcast('serviceDetail.change',$scope.service);
					});

					$scope.$on('service.list',function(){
						$scope.showStep = 0;
					});
				}
			}
		}]);
	}
	);