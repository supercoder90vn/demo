angular.module('phApp.service_custom',[])

.service('ServiceCustom', function(){
    console.log("~~~~~~~~~~~~~~~~~~ serviceCustom");
    this.name = 'I am serviceProperty. I am global';
    var self = this;
    this.namelength = function(){
        return self.name.length;
    }
})
.service('ServiceCustom02', [function(){
    console.log("~~~~~~~~~~~~~~~~~~serviceCustom 2");
    
}]);