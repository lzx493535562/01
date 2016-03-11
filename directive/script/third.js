/* 
* @Author: Marte
* @Date:   2016-03-10 10:49:31
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-10 11:00:47
*/
define(["app"],function(app){
    app.directive("lmthird",function(){
        return{
            restrict:"E",
            templateUrl:"/directive/html/third.html",
            link:function($scope,$element,$attrs){

            }
        }
    })
})