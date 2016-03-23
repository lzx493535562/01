define(["app",
	"service-user"
	],function(app,cookie){
	app.directive("lmlogin",['$rootScope','$location',"lmUserService",function($rootScope,$location,userService){
			return {
				restrict:"E",
				templateUrl:"/directive/html/login.html",
				link:function($scope,$element,$attrs){
					$scope.username = userService.get('username');
					$scope.pwd = userService.get('password');

					//登录
					$scope.login = function(){
						if(!$scope.username || !$scope.pwd){return;};
							
						userService.login($scope.username,$scope.pwd)
						.success(function(data){
							console.log("login",data);
							$scope.$emit('afterLogin',data);

							$location.path('/homepage');
						})
						.error(function(err,data){
							alert("error");
						});
					};

					$scope.listen = function(){
						// 记录token
						// 记录username和password(没有被md5过)
						$scope.$on('afterLogin',function(e,data){
							userService.token(data.access_token);

							userService.set('username',$scope.username);
							userService.set('password',$scope.pwd);
						});
					};

					$scope.listen();
				}
			}

	}]);

});