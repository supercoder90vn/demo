var person ={
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function (){
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname : 'John',
    lastname : 'Doe'
}
// don't do this EVER! for demo purposes only!!
john.__proto__ = person;
/*for( var prop in john){
    if(john.hasOwnProperty(prop))
    console.log(prop + ': '+ john[prop]);
}*/

var john1 = {
    firstname : 'John1',// override john
    address: '111 Main St.',
    getFormalFullName: function(){
        return this.lastname+ ', ' + this.firstname;
    }
}

var john2 = {
    getFirstName: function(){
        return firstname;
    }
}
_.extend(john, john1,john2);
for( var prop in john){
    if(john.hasOwnProperty(prop))
    console.log(prop + ': '+ john[prop]);
}
console.log(john)