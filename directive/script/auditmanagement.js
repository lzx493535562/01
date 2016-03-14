define(["app",
		"directive-allorders",
		"directive-verify"
	],function(app){
		app.directive("lmauditmanagement",[function(){
			return {
				restrict:"E",
				templateUrl:"../directive/html/auditmanagement.html",
				link:function($scope,$element,$attrs){

				}
			}
		}]);
	}
	);