'use strict';
console.log("...global  myContacts.contacts");
angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
    console.log("...config route  myContacts.contacts");
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

// Contacts Controller
.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
    console.log("...controller  ContactsCtrl");
    // Init firebase
    var ref = new Firebase("https://mycontacts-phuc-app.firebaseio.com/contacts");  
    
    //get Contacts
    $scope.contacts = $firebaseArray(ref);
    //console.log($scope.contacts);
    
    // Show Add Form
    $scope.showAddForm = function(){
        $scope.addFormShow = true;
    }
    // Show Edit Form
    $scope.showEditForm = function(contact){
        $scope.editFormShow = true;

        $scope.id               = contact.$id ;
        $scope.name             = contact.name ;
        $scope.email            = contact.email;
        $scope.company          = contact.company;

        $scope.mobile_phone     = contact.phones.mobile;
        $scope.home_phone       = contact.phones.home ;
        $scope.work_phone       = contact.phones.work ;

        $scope.street_address   = contact.address.street_address ;
        $scope.city             = contact.address.city;
        $scope.state            = contact.address.state;
        $scope.zipcode          = contact.address.zipcode;
    }
    
    // Hide Forms
    $scope.hide = function(){
        $scope.addFormShow = false;
        $scope.contactShow = false;
    }
    
    // Submit Contacts
    $scope.addFormSubmit = function(){
        console.log("$scope")
        console.log($scope);
        console.log("function()")
        console.log(this);


        console.log("adding contact...");
        $scope.name             = $scope.name || null;
        $scope.email            = $scope.email || null;
        $scope.company          = $scope.company || null;

        $scope.mobile_phone     = $scope.mobile_phone || null;
        $scope.home_phone       = $scope.home_phone || null;
        $scope.work_phone       = $scope.nwork_phoneame || null;

        $scope.street_address   = $scope.street_address || null;
        $scope.city             = $scope.city || null;
        $scope.state            = $scope.state || null;
        $scope.zipcode          = $scope.zipcode || null;
        // Build Object
       $scope.contacts.$add({
           name: $scope.name,
           email: $scope.email,
           company: $scope.company,
           phones:{
                mobile: $scope.mobile_phone,
                home: $scope.home_phone,
                work: $scope.work_phone
           },
           address:{
               street_address: $scope.street_address,
               city: $scope.city,
               state: $scope.state,
               zipcode: $scope.zipcode
           }
       }).then(function(ref){
            var id = ref.key();
           console.log('Added Contact with ID: '+ id);
           
           // Clear Form
           clearFields();
           
           // Hide Form
           $scope.addFormShow = false;
           // Send Message
           $scope.msg = "Contact Added";
       });
    }
    
    $scope.editFormSubmit = function(){
        console.log("updating contact...");

        // Get ID
        var id = $scope.id;

        // Get Record
        var record = $scope.contacts.$getRecord(id);
        
        // Assign value
        record.name             = $scope.name;
        record.email            = $scope.email,
        record.company          = $scope.company;

        record.phones.mobile    = $scope.mobile_phone;
        record.phones.home      = $scope.home_phone;
        record.phones.work      = $scope.work_phone;
        
        record.address.street_address   = $scope.street_address;
        record.address.city     = $scope.city;
        record.address.state    = $scope.state;
        record.address.zipcode  = $scope.zipcode;
        
        $scope.contacts.$save(record).then(function(ref){
          console.log(ref.key);  
        });
        
        clearFields();
        
        // Hide Form
        $scope.editFormShow = false;
        
        $scope.msg = "Contact updated";
        
    }
    
    $scope.showContact = function(contact){
        console.log('Getting Contact...');
        
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        
        $scope.mobile_phone = contact.phones.mobile;
        $scope.home_phone = contact.phones.home;
        $scope.work_phone = contact.phones.work;
        
        $scope.street_address = contact.address.street_address;
        $scope.city = contact.address.city;
        $scope.state = contact.address.state;
        $scope.zipcode = contact.address.zipcode;
        
        $scope.contactShow = true;
    }
    
    $scope.removeContact = function(contact){
        console.log('Removing Contact');
        
        $scope.contacts.$remove(contact);
        $scope.msg="Contact Removed";
    }
    // Clear $scope Fields
    function clearFields(){
        console.log('Clearing All Fields...');
        $scope.name = '';
        $scope.email = '';
        $scope.company = '';
        $scope.mobile_phone = '';
        $scope.home_phone = '';
        $scope.work_phone = '';
        
        $scope.street_address = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zipcode = '';
    }  
}]);