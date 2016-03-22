define(["app",
		"service-user"
	],function(app){
	app.directive("lmbatchsearch",["lmUserService",function(userService){
		return {
			restrict:"E",
			templateUrl:"../directive/html/batchsearch.html",
			link:function($scope,$element,$attrs){
				
				//向上一级
				$scope.goback = function(){
					$scope.$emit("goback");
				};

				// 结算
				/*$scope.confirm = function(){
					var callbackUrl = window.location.href;
					//console.log("callbackUrl",callbackUrl);

					var fn = function(){
						var action = 'http://192.168.1.240:88/lingmall/alipay';
						var form = $('<form/>').attr({
							action:action,
							method:'post',
							enctype:'application/json',
							target:'_blank'
						});


						var appendValue = function(name,value){
							var input = $('<input/>').attr('name',name).val(value);
							form.append(input);
						};
						appendValue('access_token',userService.token());
						appendValue('order_number',$scope.selectedCount);
						appendValue('order_price',$scope.selectedPrice);
						appendValue('callback_url',callbackUrl);

						form[0].submit();
					};

					fn();
				};*/

			}
		}
	}]);
});