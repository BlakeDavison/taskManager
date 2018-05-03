var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner)
{
  mongoose.connect('mongodb:localhost:27017/test');
  //Pull in the models
  var Task = mongoose.model('Task', require('./task'), 'task');

  //register them for reference
  var models =
  {
    Task: Task
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
