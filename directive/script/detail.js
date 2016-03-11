define(["app",
		"service-goods",
		"service-img"
	],function(app){
	app.directive("lmdetail",["$routeParams","lmGoodsService","lmImgService",function($routeParams,goodsService,imgService){
		return {
			restrict:"E",
			templateUrl:"../directive/html/detail.html",
			link:function($scope,$element,$attrs){


				$scope.getDetail = function(){
					var goodsId = $routeParams.goodsId;
					goodsService.detail(goodsId)
					.success(function(data){
						$scope.data = data;
						console.log("detail",data);
					})
				};
			

				$scope.getPics = function(){
					// var code = $scope.data.sku_id;
					var code ="ceadf0860d50e36d79c0171708640835";
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
					//var code = $scope.data.sku_id;
					var code ="ceadf0860d50e36d79c0171708640835";
					imgService.getThumb([code],function(err,data){
						if(data[0]){
							var bigimgData = imgService.getFullurl(data[0].domain+"/"+data[0].key,500);
							$scope.bigimg = bigimgData;
							console.log("bigimg",$scope.bigimg);
							$scope.$apply();
						}
					})
				};

				//下载
				$scope.down = function(){
					//var code = $scope.data.sku_id;
					//var skuId = $scope.data.barcode;
					var code = 6911988018823;
					var skuId ="ceadf0860d50e36d79c0171708640835";
					var list = {skuId:skuId,code:code};
					imgService.getZipPro(list);
				};


				$scope.getDetail();
				$scope.getThumb();				
				$scope.getPics();
			}
		}
	}]);
});