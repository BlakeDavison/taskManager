var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner)
{
  mongoose.connect('mongodb://localhost:27017/test');

  var User = mongoose.model('User', require('./user'), 'user');
  var Task = mongoose.model('Task', require('./task'), 'user');

  wagner.factory('User', function(){
      return User;
  });
  return {User:User};
};
