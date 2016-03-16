define(["app"],function(app){
	app.directive("lmcatebar",[function(){
		return {
			restrict:"E",
			templateUrl:"../directive/html/catebar.html",
			link:function($scope,$element,$attrs){
				$scope.type = null;
				$scope.data = null;
				$scope.selectedData = [];

				// 加载分类元数据
				$scope.getMetadata = function(type){
					// mock
					$scope.data = [
						{text:'快餐1',value:1},
						{text:'快餐2',value:2},
						{text:'快餐3',value:3},
						{text:'快餐4',value:4},
						{text:'快餐5',value:5},
						{text:'快餐6',value:6},
						{text:'快餐7',value:7},
					];
				};

				// 选择
				$scope.select = function(value){
					var item = _.find($scope.data,function(n){return n.value == value;});
					if(_.indexOf($scope.selectedData,item)==-1){
						$scope.selectedData.push(item);
					}
				};

				// 反选
				$scope.unSelect = function(value){
					$scope.selectedData = _.filter($scope.selectedData,function(n){
						return n.value!=value;
					});
				};

				$scope.type = $attrs.type;

				$scope.getMetadata($scope.type);

			}
		}
	}]);
});