var express = require('express');
var status = require('http-status');

module.exports = function(wagner)
{
  var api = express.Router();
//set the route in order to get a user by ID
  api.get('/user/id/:id', wagner.invoke(function(User)
  {
    return function(req, res)
    {
      User.findOne({_id: req.params.id},
        handleOne.bind(null, 'user', res));
    };
  }));
//set the route to get a task by ID
  api.get('/task/id/:id', wagner.invoke(function(Task)
  {
    return function(req, res)
    {
      Task.findOne({_id: req.params.id},
        handleOne.bind(null, 'task', res));
    };
  }));
//this will get the id of the person assigned to task
/*  api.get('/task/person/:id', wagner.invoke(function()
  {
    return function(req, res)
    {
      var sort = {name:1};

    };
  }));*/
//This will get a task by ID
  api.get('/project/id/:id', wagner.invoke(function(Project)
  {
    return function(req, res)
    {
      Project.findOne({_id: req.params.id},
        handleOne.bind(null, 'project', res));
    };
  }));
  return api;
};

//function definitons ti apply DRY-ness
function handleOne(property, res, err, result)
{
  if(err)
  {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({error:err.toString()});
  }
  if(!result)
  {
    return res.
      status(status.NOT_FOUND);
      json({error: 'Not found'});
  }
  var json = {};
  json[property] = result;
  res.json(json);
}

function handleMany(property, res, err, result)
{
  if(err)
  {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({error: err.toString()});
  }
  var json = {};
  json[property] = result;
  res.json(json);
}
