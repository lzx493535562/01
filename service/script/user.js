// 用户模块
define([
	'app',
	'cookie'
	],
	function(app,cookie){
		app.service('lmUserService', ['$http',function($http){
			var urlPrefix = 'http://192.168.1.240:88';
			var urlDict = {
				login:'/oauth/access_token'
			};
			var methodDict = {
				post:'POST',
				get:'GET'
			};

			// 我的商品库
			this.login = function(username,password){
				return $http({
					url:urlDict.goods,
					method:methodDict.post,
					data:{
						"username":username,
						"password":password,
						"grant_type":"password",
						"client_id":"f3d259ddd3ed8ff3843839b",
						"client_secret":"4c7f6f8fa93d59c45502c0ae8c4a95b"
					}
				});
			};

			this.token = function(token){
				if(token === undefined){
					return cookie.get('token');
				}else{
					cookie.set('token',token);
				}
			};

		}]);
	}
);