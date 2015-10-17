//var util = require('/.util');
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	API
~~~~~~~~~~~~~~~~~~~~~~~*/
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
// I. util
console.log("I. UTIL ~~~~~~~~~~~~~");
var util = require('util');
var name = 'Tony';
var greeting = util.format('Hello, %s', name);
util.log(greeting);
// II. event
console.log();
console.log("II. EVENT ~~~~~~~~~~~~~");
var Emitter = require('events');
var eventConfig = require('./config').events;
var emtr = new Emitter();

emtr.on(eventConfig.GREET, function(){
	console.log('emit 1')	
});
emtr.on(eventConfig.GREET, function(){
	console.log('emit 2')	
});

emtr.emit(eventConfig.GREET);
console.log("III. inherit ~~~~~~~~~~~~~");

function Greetr(){
	Emitter.call(this);
	this.greeting = 'Hello world!';
}

util.inherits(Greetr, Emitter);

Greetr.prototype.greet = function () {
	console.log(this.greeting);
	this.emit('greet');
}

var greeter1 = new Greetr();

greeter1.on('greet',function(){
	console.log('Someone greeted!');
});

greeter1.greet();