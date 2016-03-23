define(["app",
	"underscore",
	"cookie"
	],function(app,_,cookie){
	app.directive("lmhome",["$rootScope","$location","$routeParams",
		function($rootScope,$location,$routeParams){
			return {
				retrict:"E",
				templateUrl:"../directive/html/home.html",
				link:function($scope,$elememt,$attrs){
					$scope.keyword = "";
					$scope.linkTo = function(path){
						if(path=='/goodslist'){
							var path = "/goodslist/"+JSON.stringify({keyword:$scope.keyword.replace('/','')});
							$location.path(path);
						}else{
							$location.path(path);
						}
					}
					$scope.keydown = function(e,type){
					if(e.keyCode==13){
						$scope.linkTo('/goodslist');
					}
				};
			}
		}
	}]);
});