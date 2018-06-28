const express = require('express');
const status = require('http-status');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const saltRounds = 9;
/*A list of routes          and           what they do    NOTE: all routes will have /api/v1 in front
DELETE:  /tasks                             -deletes a task by id
GET:     /tasks/users                       -returns all tasks assigned to current user
POST:    /tasks                             -creates a new task
PUT:     /tasks/sprint                      -updates a tasks sprint assignment
PUT:     /tasks/done                        -changes an array of tasks to completed
PUT:     /tasks/ndone                       -changes a task to incomplete
PUT:     /tasks/project                     -changes the project a task is assigned to
GET:     /tasks/project                     -changes the project a task is assigned to
GET:     /projects/users                    -returns all projects a user is on
DELETE:  /sprints                           -delete a sprint
POST:    /sprints                           -create new sprint
GET:     /sprints/project/                  -returns all sprints in a project
GET:     /projects/users                    -returns all projects assigned to current user
DELETE:  /projects                          -delete a project
POST:    /projects                          -creates new project
GET:     /users/id                          -get user by id
POST:    /users                             -creates a new user
POST:    /login                             -create a session
*/
module.exports = function(wagner)
{
  var api = express.Router();

  api.delete('/tasks', wagner.invoke(function(Task)
  {//delete a task
    return function(req, res)
    {
      Task.findOneAndRemove({_id: req.body._id}, function(err)
      {
        if(err){console.log(err);return res.status(500).send();}
        return res.status(status.OK);
      });
    }
  }));
  api.get('/tasks/users', wagner.invoke(function(Task)
  {//get all tasks of current user.
    return function(req, res)
    {
      Task.find({user:req.session.user},
        handleMany.bind(null, 'task', res));
    };
  }));
  api.post('/tasks', wagner.invoke(function(Task)
  {//create new task
    return function(req, res)
    {
      var t = new Task();
      t.name = req.body.name;
      t.project = req.body.project;
      t.sprint = req.body.sprint;
      t.user = req.session.user;
      t.due = req.body.due;
      t._id = mongoose.Types.ObjectId();
      t.save(function(err)
      {
        if (err) {console.log(err);return res.json({error:err});}
        return res.json({message:"saved"});
      });
    };
  }));
  api.put('/tasks/sprint', wagner.invoke(function(Task)
  {//updates sprint
    return function(req, res)
    {
      try {
        var tsk = req.body;
      } catch (e) {
        return res.
          status(status.BAD_REQUEST).
          json({error: 'No task selected'});
      }
      Task.findOneAndUpdate({_id: req.body._id}, {$set:{sprint:req.body.sprint}}, {new:true}, function(err, doc)
      {
        if (err){console.log(err);}
        res.json({message:'updated.'});
      });
    };
  }));
  api.put('/tasks/done', wagner.invoke(function(Task)
  {//updates the completed tasks
    return function(req, res)
    {
      try {
        var tsk = req.body[0];
      } catch (e) {
        return res.
          status(status.BAD_REQUEST).
          json({error: 'No tasks selected'});
      }
      req.body.forEach(function(tk)
      {
        Task.findOneAndUpdate({_id: tk._id}, {$set:{complete:true}}, {new:true}, function(err, doc)
        {
          if (err){console.log(err);}
        });
      });
      res.json({message:'updated.'});
    };
  }));
  api.put('/tasks/ndone', wagner.invoke(function(Task)
  {//updates the completed tasks
    return function(req, res)
    {
      try {
        var tsk = req.body;
      } catch (e) {
        return res.
          status(status.BAD_REQUEST).
          json({error: 'No tasks selected'});
      }
      Task.findOneAndUpdate({_id: req.body._id}, {$set:{complete:false}}, {new:true}, function(err, doc)
      {
        if (err){console.log(err);}
      });
      res.json({message:'updated.'});
    };
  }));
  api.put('/tasks/project', wagner.invoke(function(Task)
  {//updates project
    return function(req, res)
    {
      try {
        var tsk = req.body;
      } catch (e) {
        return res.
          status(status.BAD_REQUEST).
          json({error: 'No task selected'});
      }
      Task.findOneAndUpdate({_id: req.body._id}, {$set:{project:req.body.project}}, {new:true}, function(err, doc)
      {
        if (err){console.log(err);}
        return res.status(status.OK);
      });
    };
  }));
  api.get('/task/project', wagner.invoke(function(Task)
  {//get all tasks in a project
    return function(req, res)
    {
      Task.
        find({project: req.body._id}).
        //populate('user').
        sort({name:1}).
        exec(handleMany.bind(null,'tasks', res));
    };
  }));
  api.get('/sprints/users', wagner.invoke(function(Sprint)
  {// get all the sprints in a user
    return function(req, res)
    {
      Sprint.find({user: req.session.user},
        handleMany.bind(null, 'sprint', res));
    };
  }));
  api.delete('/sprints', wagner.invoke(function(Sprint)
  {//delete a sprint
    return function(req, res)
    {
      Sprint.findOneAndRemove({_id: req.body._id}, function(err)
      {
        if(err){console.log(err);return res.status(500).send();}
        return res.status(status.OK);
      });
    };
  }));
  api.post('/sprints', wagner.invoke(function(Sprint)
  {//create new task
    return function(req, res)
    {
      var t = new Sprint();
      t.name = req.body.name;
      t.project = req.body.project;
      t.user = req.session.user;
      t._id = mongoose.Types.ObjectId();
      t.save(function(err)
      {
        if (err) {console.log(err);return res.status(status.INTERNAL_SERVER_ERROR).send();}
        return res.json({message:"saved"});
      });
    };
  }));
  api.get('/sprints/project', wagner.invoke(function(Sprint)
  {//get all the sprints in a project
    return function(req, res)
    {
      Sprint.
        find({project: req.body._id}).
        //populate('user').
        sort({name:1}).
        exec(handleMany.bind(null,'sprints', res));
    };
  }));
  api.get('/projects/users', wagner.invoke(function(Project)
  {//get all the projects with a user
    return function(req, res)
    {
      Project.find({user:req.session.user},
        handleMany.bind(null, 'project', res));
    };
  }));
  api.delete('/projects', wagner.invoke(function(Project)
  {//delete a project
    return function(req, res)
    {
      Project.findOneAndRemove({_id: req.body._id}, function(err)
      {
        if(err){console.log(err);return res.status(500).send();}
        return res.status(status.OK);
      });
    }
  }));
  api.post('/projects', wagner.invoke(function(Project)
  {//create new project
    return function(req, res)
    {
      var t = new Project();
      t.name = req.body.name;
      t.user = req.session.user;
      t._id = mongoose.Types.ObjectId();
      t.save(function(err)
      {
        if (err) {console.log(err);return res.status(status.INTERNAL_SERVER_ERROR).send();}
        return res.status(status.OK);
      });
    };
  }));
  api.get('/users/id', wagner.invoke(function(User)
  {//set the route in order to get a user by ID
    return function(req, res)
    {
      User.findOne({_id: req.body._id},
        handleOne.bind(null, 'user', res));
    };
  }));
  api.post('/users', wagner.invoke(function(User)
  {//create a user and a session for them.
    return function(req, res)
    {
      var n = new User();
      n.email = req.body.email;
      bcrypt.hash(req.body.password, saltRounds, function(err, hash)
      {
        n.password = hash;
        n._id = mongoose.Types.ObjectId();
        req.session.user = n._id;//store session
        req.session.projects = [];
        n.save(function(err, nUser)
        {
          if(err){console.log(err); return res.status(status.INTERNAL_SERVER_ERROR).send();}
          return res.status(status.OK).json({user:req.session.user});
        });
      });
    }
  }));
  api.post('/login',  wagner.invoke(function(User)
  {//create a session
    return function(req, res)
    {
      User.findOne({email:req.body.email}, function(err, user)
      {
        if(err){console.log('err:'+err);return res.status(status.INTERNAL_SERVER_ERROR).send();}
        if(!user){return res.status(status.UNAUTHORIZED).send();}
        bcrypt.compare(req.body.password, user.password, function(err, resp)
        {
          if(resp)
          {
            req.session.user = user._id;
            return res.status(status.OK).json({user:req.session.user});
          }
          else{return res.status(status.UNAUTHORIZED).send();}
        });
      });
    };
  }));

  //These were for dev options
  api.get('/test/set/session', wagner.invoke(function(User)
  {
    return function(req, res)
    {
      req.session.user = "50341373e894ad16347efe01";
      res.status(status.OK).send();
    };
  }));
  api.get('/test/get/session', wagner.invoke(function(User)
  {
    return function(req, res)
    {
      res.status(status.OK).json({session:req.session.user});
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
