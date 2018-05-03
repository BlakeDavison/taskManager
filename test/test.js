var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Task API', function(){
  var server;
  //make a var for each of the models
  var Task;
  var User;
  var Project;

  before(function(){//sets up the server and makes the models avalible for the tests
    var app = express();

    models = require('../models/models')(wagner);
    app.use(require('../api')(wagner));

    server = app.listen(3000);

    //make models avalible
    Task = models.Task;
    User = models.User;
    Project = models.Project;
  });
  after(function(){//shut down the server
    server.close();
  });
  beforeEach(function(done){//empty out the data before each test
    Task.remove({}, function(err){
      assert.ifError(err);
      User.remove({}, function(err){
        assert.ifError(err);
        Project.remove({}, function(err){
          assert.ifError(err);
        });
      });
    });
  });

  it('can load a task by id', function(done){
    TASK_ID = '000000000000000000000001';
    var task = {
      name:'some stuff',
      _id: TASK_ID
    };
    Task.create(task, function(err, doc){//creates task then callback to use it
      assert.ifError(err);
      var url = URL_ROOT + '/task/id/' + TASK_ID;//URL to call the task
      superagent.get(url, function(err, res){//this checks for the task then we make sure we got what we expected
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text);
        });
        assert.ok(result.task);
        assert.equal(result.task._id, TASK_ID);
        assert.equal(result.task.name, 'some stuff');
        done();
      });
    });
  });
});
