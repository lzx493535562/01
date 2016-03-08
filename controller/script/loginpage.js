/*define(["app","cookie","jquery","service-user"],function(app,cookie,$){
	app.controller("lmLoginpageCtrl",["$scope","$location","lmuserservice",'$rootScope',
		function($scope,$location,$rootScope){
			var memo = userService.readMemory();
			$scope.username = memo.username || "";
			$scope.pwd= memo.pwd || "";
			$scope.LoginrectHeight=window.innerHeight-98;
			window.onresize=function(){
				$scope.LoginrectHeight=window.innerHeight-98;
				$scope.$apply();
			}
			$scope.login = function(){
				userService.login($scope.username,$scope.pwd,function(err,data){
					console.log(err,data);
					if(!err){
						$rootScope.isLogin = true;
						$rootScope.username = userService.readLocalUsername();
						$location.path($rootScope.prevPath || '/');
						$scope.$apply();
					}else{
						if(data.data=="no user found"){
							alert('登录失败，账号或密码错误！');
						}
					}
				});
			};

			$scope.linkTo = function(path){
				$location.path(path);
			};
			$scope.href=function(targethref){
				return window.location.href.split('?')[0]+'/..'+targethref;
			}
			$scope.forgetPwd = function(){
				
			};

			$scope.keydown = function(e){
				if(e.keyCode==13){
					$scope.login();
				}
			};
			
		}
	]);
});*/

define(["app",
		"directive-topmenu",
		"directive-copyright",
		/*"directive-sidebar",*/
	],function(app){
	app.controller("lmLoginpageCtrl",function($scope){

	});	
});