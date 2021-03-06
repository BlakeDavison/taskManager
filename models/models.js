const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = function(wagner)
{
  mongoose.connect('mongodb://localhost:27017/test');

  var User = mongoose.model('User', require('./user'), 'users');
  var Task = mongoose.model('Task', require('./task'), 'tasks');
  var Project = mongoose.model('Project', require('./project'), 'projects');
  var Sprint = mongoose.model('Sprint', require('./sprint'), 'sprints');

  var models = {
    User: User,
    Task: Task,
    Project: Project,
    Sprint: Sprint
  };


  _.each(models, function(value, key)
  {
    wagner.factory(key, function()
    {
        return value;
    });
  });
  return models;
};
