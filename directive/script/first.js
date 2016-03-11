/* 
* @Author: Marte
* @Date:   2016-03-09 11:00:14
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-10 10:14:07
*/
define(["app"],function(app){
    app.directive("lmfirst",function(){
            return {
                        restrict:"E",
                        templateUrl:"/directive/html/first.html",
                        link:function($scope,$element,$attrs){

                        }
                    }

    });

});