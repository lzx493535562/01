/* 
* @Author: Marte
* @Date:   2016-03-10 10:26:52
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-10 10:27:24
*/

define(["app",
		"cookie",
		"service-user"
	],function(app,cookie){
    app.directive("lmlogin",["lmUserService",function(userService){
            return {
                restrict:"E",
                templateUrl:"/directive/html/login.html",
                link:function($scope,$element,$attrs){
                	$scope.username = userService.token().username;
                	$scope.password = userService.token().password;

                	//注册
                	this.register = function(mobile,email,pwd,captcha){
                		userService.regiser()
                		.success(function(data){
                			console.log(data);
                		})
                		.error(function(err,data){
                			console.log("error",err);
                		})
                	};

                	//登录
                	$scope.login = function(){
                		userService.login($scope.username,$scope.password)
                		.success(function(data){
                			console.log("login",data);
                		})
                		.error(function(err,data){
                			alert("error");
                		});
                	}
                }
            }

    }]);

});