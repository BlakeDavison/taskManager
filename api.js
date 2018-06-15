const express = require('express');
const status = require('http-status');
const mongoose = require('mongoose');
/*A list of routes          and           functions       NOTE: all routes will have /api/v1 in front
GET:     /tasks                             -returns a list of all tasks
DELETE:  /tasks                             -deletes a task by id
POST:    /tasks                             -creates a new task
GET:     /tasks/user/:id                    -returns all tasks assigned to a user
PUT:     /tasks/sprint                      -updates a tasks sprint assignment
PUT:     /tasks/done                        -changes an array of tasks to completed
PUT:     /tasks/ndone                       -changes a task to incomplete
PUT:     /tasks/project                     -changes the project a task is assigned to
GET:     /sprints                           -returns all sprints
POST:    /sprints                           -create new sprint
DELETE:  /sprints                           -delete a sprint
GET:     /projects                          -returns all projects
POST:    /projects                          -creates new project
DELETE:  /projects                          -delete a project
GET:     /sprints/project/:id               -returns all sprints in a project

*/
module.exports = function(wagner)
{
  var api = express.Router();

  api.get('/tasks', wagner.invoke(function(Task)
  {//temp till sessions is implemented
    return function(req, res)
    {
      Task.find({},
        handleMany.bind(null, 'task', res));
    };
  }));
  api.get('/tasks/user/:id', wagner.invoke(function(Task)
  {//this will get all of the tasks assigned to the user
    return function(req, res)
    {
      Task.
        find({user: req.params.id}).
      //  populate('user').
        sort({name:1}).
        exec(handleMany.bind(null,'tasks', res));
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
      t.due = req.body.due;
      t._id = mongoose.Types.ObjectId();
      console.log(t);
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
        console.log(doc);
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
          console.log(doc);
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
        console.log(doc);
      });
      res.json({message:'updated.'});
    };
  }));
  api.put('/tasks/project', wagner.invoke(function(Task)
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
      Task.findOneAndUpdate({_id: req.body._id}, {$set:{project:req.body.project}}, {new:true}, function(err, doc)
      {
        if (err){console.log(err);}
        console.log(doc);
        res.json({message:'updated.'});
      });
    };
  }));
  api.delete('/tasks', wagner.invoke(function(Task)
  {
    return function(req, res)
    {
      console.log(req.body);
      Task.findOneAndRemove({_id: req.body._id}, function(err)
      {
        if(err){console.log(err);res.json({error:err});}
        return res.json({message:'deleted.'});
      });
    }
  }));
  // get all sprints
  api.get('/sprints', wagner.invoke(function(Sprint)
  {
    return function(req, res)
    {
      Sprint.find({},
        handleMany.bind(null, 'sprint', res));
    };
  }));
  api.delete('/sprints', wagner.invoke(function(Sprint)
  {
    return function(req, res)
    {
      console.log(req.body);
      Sprint.findOneAndRemove({_id: req.body._id}, function(err)
      {
        if(err){console.log(err);res.json({error:err});}
        return res.json({message:'deleted.'});
      });
    };
  }));
  api.get('/projects', wagner.invoke(function(Project)
  {
    return function(req, res)
    {
      Project.find({},
        handleMany.bind(null, 'project', res));
    };
  }));
  api.delete('/projects', wagner.invoke(function(Project)
  {
    return function(req, res)
    {
      console.log(req.body);
      Project.findOneAndRemove({_id: req.body._id}, function(err)
      {
        if(err){console.log(err);res.json({error:err});}
        return res.json({message:'deleted.'});
      });
    }
  }));
  api.post('/projects', wagner.invoke(function(Project)
  {//create new task
    return function(req, res)
    {
      var t = new Project();
      t.name = req.body.name;
      t._id = mongoose.Types.ObjectId();
      console.log(t);
      t.save(function(err)
      {
        if (err) {console.log(err);return res.json({error:err});}
        return res.json({message:"saved"});
      });
    };
  }));
//set the route in order to get a user by ID
  api.get('/user/id/:id', wagner.invoke(function(User)
  {
    return function(req, res)
    {
      User.findOne({_id: req.params.id},
        handleOne.bind(null, 'user', res));
    };
  }));
  api.post('/user', wagner.invoke(function(User)
  {
    return function(req, res)
    {
      User.create(
      {
        name: 'test'
      }, function(err, user)
      {
        if(err)
        {
          res.send(err);
        }
      });
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
  api.get('/sprints/project/:id', wagner.invoke(function(Sprint)
  {//get all the sprints in a project
    return function(req, res)
    {
      Sprint.
        find({project: req.params.id}).
        //populate('user').
        sort({name:1}).
        exec(handleMany.bind(null,'sprints', res));
    };
  }));
  api.post('/sprints', wagner.invoke(function(Sprint)
  {//create new task
    return function(req, res)
    {
      var t = new Sprint();
      t.name = req.body.name;
      t.project = req.body.project;
      t._id = mongoose.Types.ObjectId();
      console.log(t);
      t.save(function(err)
      {
        if (err) {console.log(err);return res.json({error:err});}
        return res.json({message:"saved"});
      });
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
