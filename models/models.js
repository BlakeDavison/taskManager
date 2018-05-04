var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner)
{
  mongoose.connect('mongodb://localhost:27017/test');

  var User = mongoose.model('User', require('./user'), 'user');
  var Task = mongoose.model('Task', require('./task'), 'user');

  var models =
  {
    User: User,
    Task: Task
  };


  _.each(models, function(value, key)
  {
    wagner.factory(key, function()
    {
        return User;
    });
  });
  return models;
};
