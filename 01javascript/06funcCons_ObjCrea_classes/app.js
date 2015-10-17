
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FUNCTION CONSTRUCTORS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function Person_func(){
    this.firstname = 'Default';
    this.lastname = 'Default';
}


Person_func.prototype.getFullName = function(){
    // prototype similar to  <LINE 46> => var person_obj{getFullName = function(){return ....}}
    return this.firstName + ' ' + this.lastname;
}

var  john_func = new Person_func();

console.log(john_func);
john_func.firstname = 'john_first';
john_func.lastname = 'john_last';
console.log(john_func);
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
OBJECT CREATE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Object2 = function(){};
function Object2(){};
if(!Object2.create){
    console.log("___Object.create not exists");
    Object2.create = function(o){
        if(arguments.length >1){
            throw new Error('Object.create implementation'
                + ' only accepts the first parameter.');
        }
        function F(){} // if not exists, then console will show F{...} instead of Object{...} which exists in function Object
        F.prototype = o;
        return new F();
    };
}

var person_obj = {
    firstname: 'Default',
    lastname:  'Default',
    getFullName: function(){
        return this.firstname + ' ' + this.lastname;
    }    
}

var john_obj = Object2.create(person_obj);
console.log(john_obj);
john_obj.firstname = 'john_first';
john_obj.lastname = 'john_last';
john_obj.name1 = 'name1';
console.log(john_obj);
console.log(john_obj.getFullName());
console.log(john_obj.__proto__.getFullName());


var person2_obj = {
    firstname2: 'Default',
    lastname2:  'Default',
    getFullName2: function(){
        return this.firstname + ' ' + this.lastname;
    }    
}
var john_obj2 = Object2.create(person2_obj);

person2_obj.funcAdd2 = function(){console.log("__add2");};

john_obj2.firstname = 'john2_first';
john_obj2.lastname = 'john2_last';
john_obj2.name1 = 'name2';

console.log(john_obj2);
console.log(john_obj);

var john_obj2_2 = Object2.create(person2_obj);
john_obj2_2.funcAdd2();
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ES6 & CLASSES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*class Person {
    constructor(firstname, lastname){
        this.firstname = firstname;
        this.lastname = lastname;
    }
    greet(){
        return 'Hi ' + firstname;
    }
}

var john = new Person('john_first','john_last');
john.greet();
class Informal Person extends Person{
     greet(){
        return 'Yo  ' + firstname;
    }
}
*/