var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/test');
//pull in the models form their respective files
  var User = mongoose.model('User', require('./user'), 'user');
  var Product = mongoose.model('Project', require('./project'), 'project');
  var Task = mongoose.model('Task', require('./task'), 'task');
//register them for reference
  var models = {
    User: User,
    Project: Project,
    Task: Task
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
