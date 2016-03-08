define(["app",
	"angularRoute",
	'ctrl-index',
	"ctrl-mygoodspage"
	// "ctrl-settlement"
	],
	function(app){
		var initRoute = function(){		
			app.config(["$routeProvider",function($routeProvider){
				$routeProvider
					.when("/",{
						templateUrl:"view/index.html",
						controller:"lmIndexCtrl"
					})
					.when("/mygoodspage",{
						templateUrl:"view/mygoodspage.html",
						controller:"lmMygoodspageCtrl"
					})
					// .when("/worktable",{
					// 	templateUrl:"view/worktable",
					// 	controller:"lmWorktableCtrl"
					// })
					// .when("/loginpage",{
					// 	templateUrl:"view/loginpage.html",
					// 	kkk:'kkk',
					// 	controller:"lmLoginpageCtrl"
					// })
					// .when("/productdetail/:goodId",{
					// 	templateUrl:"view/productdetail.html",
					// 	controller:"lmProductdetailCtrl"
					// })
					// .when("/apisupportpage",{
					// 	templateUrl:"view/apisupportpage.html",
					// 	controller:"lmApisupportpageCtrl"
					// })
					// .when("/shujubaopage",{
					// 	templateUrl:"view/shujubaopage.html",
					// 	controller:"lmShujubaopageCtrl"
					// })
					// .when("/goodspage/:subpage",{
					// 	templateUrl:"view/goodspage.html",
					// 	controller:"lmGoodspageCtrl"
					// })
					// .when("/goodslist/:params?",{
					// 	templateUrl:"view/goodslistpage.html",
					// 	controller:"lmGoodslistpageCtrl"
					// })
					// .when("/codesearchpage",{
					// 	templateUrl:"view/codesearchpage.html",
					// 	controller:"lmCodesearchpageCtrl"
					// })
					// .when("/customservicepage",{
					// 	templateUrl:"view/customservicepage.html",
					// 	controller:"lmCustomservicepageCtrl"
					// })
					// .when("/registerpage",{
					// 	templateUrl:"view/registerpage.html",
					// 	controller:"lmRegisterpageCtrl"
					// })
					// .when("/forgetpw",{
					// 	templateUrl:"view/forgetpw.html",
					// 	controller:"lmForgetpwCtrl"
					// })
					// .when("/goodsdata/:params?",{
					// 	templateUrl:"view/goodsdatapage.html",
					// 	controller:"lmGoodsdatapageCtrl"
					// })
					// .when("/categorydata/:categoryId",{
					// 	templateUrl:"view/categorydatapage.html",
					// 	controller:"lmCategorydatapageCtrl"
					// })
					// .when("/goodspage/mycollectpage",{
					// 	templateUrl:"view/mycollectpage.html",
					// 	controller:"lmMycollectpageCtrl"
					// })
					// .when("/downpicpage/:goodId",{
					// 	templateUrl:"view/downpicpage.html",
					// 	controller:"lmDownpicpageCtrl"
					// })
					// .when("/about",{
					// 	templateUrl:"view/about.html",
					// 	controller:"lmAboutCtrl"
					// })
					// .when("/settlement/:params",{
					// 	templateUrl:"view/settlement.html",
					// 	controller:"lmSettlment"
					// })
					.otherwise({
						redirectTo:"/"
					});
			}]);
			
			// app.run(['$rootScope','$location','lmuserservice',function($rootScope,$location,userService){
				// $rootScope.$on('$locationChangeStart',function(event,nextUrl){
				// 	//console.warn(nextUrl);
				// 	var authPathArr = ['/goodspage/mycollectpage','/goodspage/info','goodspage/expensecenter'];
				// 	if(_.find(authPathArr,function(n){return nextUrl.indexOf(n)>=0;})){
				// 		if(!$rootScope.isLogin){
				// 			userService.isLogin(function(err,data){
				// 				if(!data){
				// 					$rootScope.prevPath = nextUrl.split("#")[1];
				// 					console.log('go to loginpage');
				// 					$location.path('/loginpage');
				// 				}else{
				// 					$rootScope.isLogin = true;
				// 					$rootScope.username = userService.readLocalUsername();
				// 				}
				// 				$rootScope.$apply();
				// 			});
				// 		}
				// 	}
				// });
			// }]);
		};
		return {init:initRoute};
	}
);
