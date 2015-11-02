var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash'); //__ (^_^) lodash is superset of Underscore

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImages: function(topicId){
    Api.get('topics/' + topicId)
      .then(function(json){
        var images = _.reject(json.data, function(image) { //__ (^_^)  ??? 
          return image.is_album;
        });
        this.trigger('images', images);
      }.bind(this));
  },
  getImage: function(id) {
    Api.get('gallery/image/' + id)
      .then(function(json){
        this.trigger('image', json.data);
      }.bind(this));
  },
});