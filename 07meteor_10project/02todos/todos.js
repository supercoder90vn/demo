Todos = new Mongo.Collection('todos');

console.log("#############################################################################");
Todos.pcount = 0;
var logCount = function(){
  Todos.pcount= Todos.pcount+1;
  console.log("_____pcount: "+ Todos.pcount);
}
logCount(Todos.pcount);

if (Meteor.isClient) {
  console.log("CLIENT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  Meteor.subscribe('todos_S');  
  // Template Helpers
  Template.main.helpers({
    todos: function(){
      //return Todos.find();
      console.log("CLIENT:Todos_find()_____________________________________userId:" + Meteor.userId());
      logCount();
      return Todos.find({},{sort: {createdAt: -1}});
    }
  });
  
  Template.main.events({
    "submit .new-todo": function(event){
      var text = event.target.text.value;
      
     Meteor.call('addTodo', text);
      
      // Clear Form
      event.target.text.value='';
      
      // Prevent Submit      
      return false;
    },
    "click .toggle-checked": function(){
      Meteor.call('setChecked', this._id, !this.checked);
    },
    "click .delete-todo": function(){
      if(confirm('Are You Sure?')){
        Meteor.call('deleteTodo',this._id);
      }      
    }
  });
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  }); 
}

if (Meteor.isServer) {
  console.log("SERVER:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  
  Meteor.publish('todos_S', function(){    
    console.log("SERVER:Publish__todos______________________");
    logCount();
    if(!this.userId){
      return Todos.find();
    } else {
      return Todos.find({userId: this.userId});
    }
  });
}



Meteor.methods({
  addTodo: function(text){    
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
      Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username        
    });      
  },
  deleteTodo: function(todoId){    
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Todos.remove(todoId);
  },
  setChecked: function(todoId, setChecked){
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Todos.update(todoId,{$set:{checked: setChecked}});
  }
  
});  

