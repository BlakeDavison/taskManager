var mongoose = require('mongoose');

module.exports = function(wagner)
{
  mongoose.connect('mongodb://localhost:27017/test');

  var User = mongoose.model('User', require('./user'), 'user');

  wagner.factory('User', function(){
      return User;
  });
  return {User:User};
};
