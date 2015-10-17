// get a new object (the architecture allows us to not have to use the 'new' keyword here )
var g = G$('John','Doe');

///console.log(g);

// user our chanable methods
g.greet().setLang('es').greet(true).log();

///g.setLang('fr');


// let's user our object on the click of the login button
$('#login').click(function(){
    
    // create a new 'Greetr' object (let's pretend we know the name form the login)
    var loginGrtr = G$('John', 'Doe');
    
    
    // hide the login on the screen
    $('#logindiv').hide();
    
    
    // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
    loginGrtr.setLang($('#lang').val())
        .HTMLGreeting('#greeting', true)
        .log();
    
});