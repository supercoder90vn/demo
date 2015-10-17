;(function (global, $) {
    "use strict";
     /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        RETURN FUNC_CONSTR
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // 'new' an object
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };
    
    // hidden within the scope of the IIFE and never directly accessible    
    var supportedLangs = ['en', 'es'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    // loger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Greetr.prototype
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // prototype holds methods (to save memory space)
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function () {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        // retrieve messages form  object by refering to properties using[] syntax
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        getGreetingText: function (formal) {
             var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            return msg;
        },
        // chainable methods 
        greet: function (formal) {        
            
            if (console) {
                console.log(this.getGreetingText(formal));
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // make chainable             
            return this;
        },
          
        setLang: function (lang) {
            // set the language
            this.language = lang;
            
            // validate
            this.validate();
            
            // make chainable
            return this;
        },
        
        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }
            if(!selector){
                throw 'Missing jQuery selector';
            }
            // inject the message in the chosen place in the DOM
           
            
            // $(selector).html(this.getGreetingText(formal));
            $(selector).text(this.getGreetingText(formal));// should use this instand of html which affects style
            // make chainable
            return this;
        }
    };
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         Greetr.init FUNC_CONSTR
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // the actual object is created here, allow us to 'new' an object without calling 'new'
    Greetr.init = function (firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        this.validate();
    };
    
    // trick borrowed from jQuery so we don't have to use the 'new' keywork
   Greetr.init.prototype =  Greetr.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease  out poor fingers
    global.Greeter = global.G$ =  Greetr;    
}(window, jQuery));