var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getTopics: function() {
    return Api.get('topics/defaults')
      .then(function(json){
         this.trigger('change', json.data);
      }.bind(this));
  }
});