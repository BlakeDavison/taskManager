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
  api.post('/task/id', wagner.invoke(function(Task)
  {
    return function(req, res)
    {
      Task.create(
      {
        name: 'test'
      }, function(err, task)
      {
        if(err)
        {
          res.send(err);
        }
        else if (!task)
        {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
      });
    }
  }));
//this will get the id of the person assigned to task
api.get('/task/person/:id', wagner.invoke(function(Task)
{
  return function(req, res)
  {
    Task.
      find({user: req.params.id}).
    //  populate('user').
      sort({name:1}).
      exec(handleMany.bind(null,'tasks', res));
  };
}));
//get all tasks in a project
api.get('/task/project/:id', wagner.invoke(function(Task)
{
  return function(req, res)
  {
    Task.
      find({project: req.params.id}).
      //populate('user').
      sort({name:1}).
      exec(handleMany.bind(null,'tasks', res));
  };
}));
//This will get a project by ID
  api.get('/project/id/:id', wagner.invoke(function(Project)
  {
    return function(req, res)
    {
      Project.findOne({_id: req.params.id},
        handleOne.bind(null, 'project', res));
    };
  }));
  //get sprint by id
  api.get('/sprint/id/:id', wagner.invoke(function(Sprint)
  {
    return function(req, res)
    {
      Sprint.findOne({_id: req.params.id},
        handleOne.bind(null, 'sprint', res));
    };
  }));
  //this will get all the sprints a project has
  api.get('/sprint/project/:id', wagner.invoke(function(Sprint)
  {
    return function(req, res)
    {
      Sprint.
        find({project: req.params.id}).
        //populate('user').
        sort({name:1}).
        exec(handleMany.bind(null,'sprints', res));
    };
  }));

  return api;
};
//function definitons to apply DRY-ness
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
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }
  var json = {};
  json[property] = result;
  res.json(json);
}
