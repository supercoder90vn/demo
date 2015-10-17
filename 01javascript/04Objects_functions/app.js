function mapForEach(arr, fn){
    var newArr =[];
    for( var i=0; i < arr.length; i++){
        newArr.push(
            fn(arr[i])
        )
    };
    return newArr;
}

var arr1 = [1,2,3];
log(arr1);

var arr2=[];
for(var i = 0; i< arr1.length;i++){
    arr2.push(arr1[i] *2);
}
log(arr2);

var arr2_2 = mapForEach(arr1, function(item){
    return item*2;
});
log(arr2_2);
log('3---------------------');
var arr3 = mapForEach(arr1, function(item){
    return item > 2;
});
log(arr3);

var checkPastLimit = function(limiter, item){
    return item > limiter;
}

var arr4 = mapForEach(arr1, checkPastLimit.bind(this,1));
log(arr4);
var checkPastLimitSimplified = function(limiter){
    return function(limiter, item){
        return item > limiter;
    }.bind(this,limiter);
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(2));
log(arr5);

//underscore
log('6---------------------');
var arr6 = _.map(arr1, function(item){ return item * 3 ; });
log(arr6);

var arr7 = _.filter(
    [2,3,4,5,6,7], 
    function(item){
        return item % 2 === 0;
    }
);
log(arr7);