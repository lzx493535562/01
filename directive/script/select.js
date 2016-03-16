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

                    	$scope.currType = null;
                    	$scope.types = null;
                    	$scope.isShow =false;

                    	// 获取服务端元数据
                    	$scope.getMetadata = function(type){
                    		goodsService.metadata(type).
                    		success(function(data){
                    			$scope.types = data;
                    			if(hasAll){
                    				$scope.types.unshift({resid:-1,value:'全部'});
                    			};
                    			// 选择第一个
                    			$scope.select($scope.types[0].resid);
                    		});
                    	};

                    	// 选择当前选项
                    	$scope.select = function(resid){
                    		$scope.currType = _.find($scope.types,function(type){return type.resid == resid;});
                    		$element.attr('value',resid);
                    		$scope.toggle(false);
                    	};

                    	// 开关选择框
                    	$scope.toggle = function(flag){
				$scope.isShow = flag ===undefined ? !$scope.isShow : flag;

                    	};


                    	$scope.getMetadata(metaType);
                    }
            }
    }]);
});