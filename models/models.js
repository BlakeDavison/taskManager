var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner)
{
  mongoose.connect('mongodb:localhost:27017/test');
  //Pull in the models
  var Task = mongoose.model('Task', require('./task'), 'task');
  var User = mongoose.model('User', require('./user'), 'user');

  //register them for reference
  var models =
  {
    Task: Task,
    User: User
  };
  //register the factories
  _.each(models, function(value, key)
  {
    wagner.factory(key, function()
    {
      return value;
    });
  });
  return models;
};
