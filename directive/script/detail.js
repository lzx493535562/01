define(["app",
		"service-goods",
		"service-img"
	],function(app){
	app.directive("lmdetail",["$routeParams","lmGoodsService","lmImgService",function($routeParams,goodsService,imgService){
		return {
			restrict:"E",
			templateUrl:"../directive/html/detail.html",
			link:function($scope,$element,$attrs){


				$scope.getDetail = function(cb){
					var goodsId = $routeParams.goodsId;
					goodsService.detail(goodsId)
					.success(function(data){
						$scope.data = data;
						console.log("detail",data);
						cb && cb();
					})
				};
			

				$scope.getPics = function(){
					var code = $scope.data.sku_id;
					var xType = 2;
					imgService.getPics(code,xType,function(err,data){
						$scope.imgData = data;
						console.log("img",data);

						var _getFullurl = function(d){
								return imgService.getFullurl(d.domain+"/"+d.key,100);
							};

						$scope.pics_main = _.map(data["1"],_getFullurl);
						$scope.pics_detail = _.map(data["2"],_getFullurl);
						$scope.pics_tag = _.map(data["3"],_getFullurl);
						$scope.pics_box = _.map(data["4"],_getFullurl);
						
						$scope.$apply();
					});
				};

				//
				$scope.getThumb = function(){
					var skuId = $scope.data.sku_id;
					imgService.getThumb([skuId],function(err,data){
						if(data[0]){
							var bigimgData = imgService.getFullurl(data[0].domain+"/"+data[0].key,500);
							$scope.setBigimg(bigimgData);
							console.log("bigimg",$scope.bigimg);
							$scope.$apply();
						}
					})
				};

				//点击小图变成大图
				$scope.setBigimg = function(data){
					$scope.currBigimg = data.replace(/\d+$/,'');
					data = data.replace(/\d+$/,"500");
					$scope.bigimg = data;
				};

				//下载
				$scope.down = function(){
					var skuId = $scope.data.sku_id;
					var code = $scope.data.barcode;
					var list = {skuId:skuId,code:code};
					imgService.getZipPro(list);
				};


				$scope.getDetail(function(){
					$scope.getThumb();				
					$scope.getPics();
				});
			}
		}
	}]);
});