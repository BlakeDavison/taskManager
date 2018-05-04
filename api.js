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
      User.findOne({_id: req.params.id}, function(err, user)
      {
        if(err)
        {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({error: err.toString()});
        }
        if(!user)
        {
          return res.
            status(status.NOT_FOUND).
            json({error: 'Not Found'});
        }
        res.json({user: user});
      });
    };
  }));
//set the route to get a task by ID
  api.get('/task/id/:id', wagner.invoke(function(Task)
  {
    return function(req, res)
    {
      Task.findOne({_id: req.params.id}, function(err, task)
      {
        if(err)
        {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({error: err.toString()});
        }
        if(!task)
        {
          return res.
            status(status.NOT_FOUND).
            json({error: 'Not Found'});
        }
        res.json({task: task});
      });
    };
  }));
//This will get a task by ID
  api.get('/project/id/:id', wagner.invoke(function(Project)
  {
    return function(req, res)
    {
      Project.findOne({_id: req.params.id}, function(err, project)
      {
        if(err)
        {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({error: err.toString()});
        }
        if(!project)
        {
          return res.
            status(status.NOT_FOUND).
            json({error: 'Not Found'});
        }
        res.json({project: project});
      });
    };
  }));
  return api;
};
