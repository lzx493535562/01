/* 
* @Author: Marte
* @Date:   2016-03-10 14:38:47
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-11 10:01:02
*/

define(["app"],function(app){
    app.directive("lmfour",function(){
        return{
            restrict:"E",
            templateUrl:"/directive/html/four.html",
            link:function($scope,$element,$attrs){
                    $scope.showIndex=0;
                    //$scope.showIndex2=0;
                    $scope.leftIndex = 1;
            }
        }
    })
})