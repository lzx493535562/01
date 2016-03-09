define(["app"],function(app){
	app.directive("lmpager",function(){
		return {
			restrict:"E",
			scope:{
				"currPage":"@",
				"pageCount":"@",
				"changeCurrPageEventName":"@",
				"changePageCountEventName":"@"
			},
			templateUrl:"../directive/html/pager.html",
			link:function($scope,$element){
				//console.log("changePageEventName",$scope.changePageEventName);
				// 是否展示首尾的dot
				$scope.isShowHeadDots = false;
				$scope.isShowTailDots = false;
				// 最多展示的数字数目
				$scope.showLen = 5;
				$scope.pageIndexs = getPageIndexs($scope.currPage,$scope.pageCount,$scope.showLen);

				// 前后翻页
				$scope.pagePrev = function(){
					$scope.currPage = setCurrPage($scope.currPage-1);
					window.scrollTo( 0, 0 );
				};
				$scope.pageNext = function(){
					$scope.currPage = setCurrPage($scope.currPage-0+1);
					window.scrollTo( 0, 0 );
				};

				// 前后"大"翻页
				$scope.pageUp = function(){
					$scope.currPage = setCurrPage($scope.currPage-$scope.showLen);
					window.scrollTo( 0, 0 );
				};
				$scope.pageDown = function(){
					$scope.currPage = setCurrPage($scope.currPage+$scope.showLen);
					window.scrollTo( 0, 0 );
				};

				// 点击数字换页
				$scope.changePageIndex = function(index){
					if(index===undefined){
						if(/[1-9]\d*/.test($scope.inputCurrPage)){
							index = $scope.inputCurrPage-1;
							$scope.currPage = setCurrPage(index);

						} 
					}else{
						$scope.currPage = setCurrPage(index);
					}
					$("body").scrollTop(0);
				};

				$scope.$watch("currPage",function  (nv,ov) {
					var nr = getRowIndex(nv),
						or = getRowIndex(ov);
				//	console.log(nv,nr,"--",ov,or);
					if(getRowIndex(nv)!=getRowIndex(ov)){
						$scope.pageIndexs = getPageIndexs($scope.currPage,$scope.pageCount,$scope.showLen);
					};
					refreshShowDots();
					// 页码的change事件
					$scope.$emit($scope.changeCurrPageEventName,{currPage:$scope.currPage});
				});

				// pageCount的change事件
				$scope.$on($scope.changePageCountEventName,function(e,data){
					$scope.pageCount = data.pageCount;
					$scope.currPage = setCurrPage($scope.currPage);
				});

				$scope.$watch("pageCount",function  () {
					$scope.pageIndexs = getPageIndexs($scope.currPage,$scope.pageCount,$scope.showLen);
					refreshShowDots();
				});
				$scope.$watch("showLen",function  () {
					$scope.pageIndexs = getPageIndexs($scope.currPage,$scope.pageCount,$scope.showLen);
					refreshShowDots();
				});

				// 刷新前后的dot
				function refreshShowDots(){
					$scope.isShowHeadDots = getRowIndex($scope.currPage) > getRowIndex($scope.showLen-1); 
					$scope.isShowTailDots = getRowIndex($scope.currPage) < getRowIndex($scope.pageCount-1);
					// console.log(
					// 	"currPage",$scope.currPage,
					// 	"currPage-rowIndex",getRowIndex($scope.currPage),
					// 	"showLen-rowIndex",getRowIndex($scope.showLen-1),
					// 	"pageCount-rowIndex",getRowIndex($scope.pageCount-1)
					// );
				};

				// 帮助函数
				// 获取index所在的rowIndex
				// eg
				// 如果"数字格子"显示数目为5个,则0在第0行,2在第0行,5在第1行
				function getRowIndex(index){
					return Math.floor(index/$scope.showLen);
				};

				// 设置当前页码
				// 其中做了基本的过滤功能
				function setCurrPage(index){
					return Math.max(Math.min($scope.pageCount-1,index),0);
				};

				// 获取当前应该展示的"数字格子"数量
				function getPageIndexs(currPage,pageCount,showLen){
					var arr = [];
					var from = getRowIndex(currPage)*showLen;
					var to = Math.min(pageCount,from+showLen);
					for(var i = from;i<to;i++){
						arr.push(i);
					};
					return arr;
				};


			}
		};

	});
});