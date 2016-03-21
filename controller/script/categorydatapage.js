define(["app",
		"directive-headbar",
		"directive-leftsidebar",
		"directive-topbar",
		"directive-categorydata",
		'tool-checker'
	],function(app){
	app.controller("lmCategorydatapageCtrl",["$scope",function($scope){
		$scope.$on("batchSearchPage",function(e,args){
			args.batchSearchPage = $scope.batchSearchPage;
			$scope.batchSearchPage = true;
		});
	}]);
});