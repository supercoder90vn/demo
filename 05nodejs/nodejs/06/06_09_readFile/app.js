var fs = require('fs');

var greet = fs.readFileSync(__dirname + '/greet.txt');

console.log(greet);

var greet2 = fs.readFile(__dirname + "/greet.txt","utf8",function(err,data){
    console.log("err: " + err);
    console.log(data);
});
console.log('DONE!');