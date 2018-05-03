var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Task API', function(){
  var server;
  var Task;//the variable will hold the model for testing

  before(function()
  {//initial server setup
    var app = express();
    //import the api and the mongoose models
    models = require('../models/models')(wagner);
    app.use(require('../api')(wagner));

    server = app.listen(3000);
    //make the models avalible
    Task = models.Task;
  });

  after(function()
  {
    //End the server at the End
    server.close();
  });

  beforeEach(function(done)
  {//empty the DB to make sure each test starts new
    Task.remove({}, function(err)
    {
      assert.ifError(err);
      done();
    });
  });

  it('can load a task by id', function(done)
  {
    //create a task
    var TASK_ID = '000000000000000000000001';
    var task =
    {
      name:'some thing',
      _id: TASK_ID
    };
    Task.create(task, function(err, res)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/task/id/' + TASK_ID;
      //superagent makes a HTTP request to the above URL
      superagent.get(url, function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.task);
        assert.equal(result.task._id. TASK_ID);
        assert.equal(result.task.name, 'some thing');
        done();
      });
    });
  });
});
