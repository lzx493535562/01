define(["app",'service-goods'],function(app){
	app.directive("lmselect",['lmGoodsService',function(goodsService){
		return{
			restrict:"E",
			scope:{},
			templateUrl:"../directive/html/select.html",
			link:function($scope,$element,$attrs){
				var metaType = $attrs.metaType;
				// 是否有'全选'选项
				var hasAll = !!$attrs.hasAll;
				var name = $attrs.name;

				$scope.name = name;
				$scope.currType = null;
				$scope.types = null;
				$scope.isShow =false;

				// 获取服务端元数据
				// $scope.getMetadata = function(type){
				// 	goodsService.metadata(type).
				// 	success(function(data){
				// 		$scope.types = data;
				// 		if(hasAll){
				// 			$scope.types.unshift({value:-1,value:'全部'});
				// 		};
				// 		// 选择第一个
				// 		$scope.select($scope.types[0].value);
				// 	});
				// };

				// 设置元数据
				$scope.setMetadata = function(types){
					$scope.types = types;
				};

				// 设置提示标题
				$scope.setTitle = function(title){
					$scope.title = title;
				}

				// 选择当前选项
				$scope.select = function(value){
					$scope.currType = _.find($scope.types,function(type){return type.value == value;});
					$element.attr('value',value);
					$scope.toggle(false);

					$scope.$emit('select.change',{name:$scope.name,data:value});
				};

				// 开关选择框
				$scope.toggle = function(flag){
					$scope.isShow = flag ===undefined ? !$scope.isShow : flag;
				};

				$scope.$on('select.setMetadata',function(e,args){
					// args ->{name:..,data:..}
					var name = args.name;
					if(name!=$scope.name){return;}

					var data = args.data;
					$scope.types = data;
					if(hasAll){
						$scope.types.unshift({value:-1,text:'全部'});
					};
					// 选择第一个
					$scope.select($scope.types[0].value);
				});


				// $scope.getMetadata(metaType);
			}
		}
	}]);
});