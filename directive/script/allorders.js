define(["app",'service-goods','dateJs','datePicker'],function(app){
	app.directive("lmallorders",['$location','lmGoodsService','lmUtilService',function($location,goodsService,UtilService){
		return {
			restrict:"E",
			scope:{},
			templateUrl:"../directive/html/allorders.html",
			link:function($scope,$elememt,$attrs){
				$scope.startTime = Date.today().addDays(-7);
				$scope.endTime = Date.today();
				$scope.status = 1;

				$scope.pageIndex = 0;
				$scope.pageSize = 8;

				// 搜索
				var searchDelay = 500;
				$scope.search = _.debounce(function(){
					var startTime = $scope.startTime.format('Y-m-d');
					var endTime = $scope.endTime.format('Y-m-d');
					var status = $scope.status;

					var pageIndex = $scope.pageIndex,
					pageSize = $scope.pageSize;
					
					goodsService.service(startTime,endTime,status,pageIndex,pageSize)
					.success(function(data){
						$scope.data = data.data;
						$scope.totalCount = data.count;
						$scope.$emit('afterSearch',data);
					});
				},searchDelay);

				$scope.getTypes = function(){
					var type = 6;
					goodsService.metadata(type)
					.success(function(data){
						$scope.types  = data;
						$scope.currType = data[0];
						console.log($scope.types);
					});
				};

				//查看进度
				$scope.progress = function(serviceNumber,$event){
					goodsService.progress(serviceNumber)
					.success(function(data){
						$scope.progressData = data;
						console.log("progress",data);
						$scope.isShowProgress = true;

						// 确定位置
						var offset = $($event.target).offset();
						$scope.progressStyle = {
							left:offset.left+100,
							top:offset.top+50
						};
					})
				};
				//查看联系人方式
				$scope.contact = function(contactsID,$event){
					goodsService.contact(contactsID)
					.success(function(data){
						$scope.contactData = data;
						$scope.isShowContact = true;
						console.log("contact",data);

						// 确定位置
						var offset = $($event.target).offset();
						$scope.contactStyle = {
							left:offset.left+100,
							top:offset.top+50
						};
					})
				};

				//隐藏查看进度框
				$scope.closeProgress = function(){
					$scope.isShowProgress = false;
				};

				//隐藏联系人框
				$scope.closeContact = function(){
					$scope.isShowContact = false;
				};				

				$scope.listen = function(){
					$scope.$on('pageIndexChanged',function(e,args){
						$scope.search();
					});

					// 搜索之后,调整页码
					$scope.$on('afterSearch',function(e,args){
						var data = args;
						$scope.pageCount = Math.floor((data.count + ($scope.pageSize - 1)) / $scope.pageSize);
					});
				};

				$scope.detail = function(order){
					$scope.$emit('service.detail',order);
				};

				//跳转页面
				$scope.linkTo = function(path,isNewTab){
					UtilService.linkTo(path,isNewTab);
				};

				$scope.bind = function(){
					$($elememt).find('.start-date,.end-date').each(function(){
						$(this).DatePicker({
							mode: 'single',
							extraHeight:10,
							extraWidth:20,
							// position:'right',
							// inline: true,
							// date: new Date(),
							onChange: function(date,el) {
								// $(this).val(date.format('Y-m-d'));
								if($(el).hasClass('start-date')){
									$scope.startTime = date;
									$scope.$apply();
								}else if($(el).hasClass('end-date')){
									$scope.endTime = date;
									$scope.$apply();
								}
								$(el).DatePickerHide();
							},
							locale:{
								daysMin: ["日", "一", "二", "三", "四", "五", "六"],
								months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
								monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
							}
						});
					});
					
				};

				$scope.listen();

				$scope.bind();

				$scope.getTypes();

				$scope.search();
			}
		}
	}]);
});