var express = require('express');
var status = require('http-status');

module.exports = function(wagner)
{//passes a subrouter through wagner
  var api = express.Router();
  api.get('/task/id/:id', wagner.invoke(function(task)
  {
    return function(req, res)
    {
      var sort = {name:1};
      if(req.query.name === "1")
      {
        sort = {'internal.name':1}
      }
      else
      {
        sort = {'internal.name':-1}
      }
      Task.
        sort(sort).
        exec(handleMany.bind(null, 'tasks', res));
    };
  }));
  return api;
};

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
      status(status.NOT_FOUND).
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
      json({error:err.toString()});
  }
  var json = {};
  json[property] = result;
  res.json(json);
}
