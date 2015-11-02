var Reflux = require('reflux');
var Actions = require('../actions');
var Api = require('../utils/api');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImage: function(id){
    Api.get('gallery/' + id + '/comments')
      .then(function(json){        
         this.trigger('comments', json.data);
      }.bind(this));
  }
});