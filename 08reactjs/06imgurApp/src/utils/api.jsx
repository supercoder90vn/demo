
var rootUrl = 'https://api.imgur.com/3/';
var apiKey = '430d6820d865788';
//Ref: postman
module.exports = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': 'Client-ID ' + apiKey
      }
    })
    .then(function(response){
      return response.json()
    })
  }
};