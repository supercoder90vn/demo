"use strict";
var person;
persom  = {};
console.log(persom);
function logNewPerson(){// if not use "user strict" globally
    "user strict";
    var person2;
    persom2 ={};
    console.log(persom2);
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Object Array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*
var people = [
    {
        // the 'john' object
        firstname: 'John',
        lastname: 'Doe',
        addresses:[
            '111 Main st.',
            '222 Third St.'
        ]
    },
    {
        // the 'jane' object
        firstname: 'Jane',
        lastname: 'Doe',
        addresses:[
            '333 Main st.',
            '444 Fifth St.'
        ],
        greet: function(){
            return 'Hello';
        }
    
    }
];

console.log(people);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
typeof, instanceof
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*
var a = 3;
console.log(typeof a);//number

var b = "Hello";
console.log(typeof b);//string

var c = {};
console.log(typeof c);//object
console.log("//~~~d:");
var d = [];
console.log(typeof d);//weird!  => object
console.log("."+d.toString()+".");//  => 
console.log(Object.prototype.toString.call(d));//better!  =>[object Array]
console.log("//~~~function Person(name){}");
function Person(name){
    this.name = name;
}

var e= new Person('Jane'); 
console.log(typeof e); // object
console.log(e instanceof Person); //true

console.log(typeof undefined);//makes sense => undefined
console.log(typeof null);// a bug since, like, forever...
console.log("//~~~var z = function(){}");
var z = function(){};// function()
console.log(typeof z);

/*~~~~~~~*/