var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('API', function(){
  var server;
  var User;
  var Task;
  var Project;

  before(function()
  {//Inital server setup
    var app = express();

    models = require('../models/models')(wagner);
    app.use(require('../api')(wagner));

    server = app.listen(3000);
    //Make the models avalible for the tests
    User = models.User;
    Task = models.Task;
    Project = models.Project;
  });

  after(function()
  {//closes server when we are done
    server.close();
  });

  beforeEach(function(done)
  {
    User.remove({}, function(err)
    {
      assert.ifError(err);
        Task.remove({}, function(err)
        {
          assert.ifError(err);
          Project.remove({}, function(err)
          {
            assert.ifError(err);
            done();
          });
        });
    });
  });
//this will test the basics of the user schema in the db
  it('loads a user by ID', function(done)
  {
    User.create({_id:13, name:'some one'}, function(err, doc)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/user/id/13';
      superagent.get(url, function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.user);
        assert.equal(result.user._id, 13);
        done();
      });
    });
  });
/*this will test the basics of the task schema in the db*/
  it('loads a task by ID', function(done)
  {
    Task.create({_id:10,name:'do this'}, function(err, doc)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/task/id/10';
      superagent.get(url, function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.task);
        assert.equal(result.task._id, 10);
        done();
      });
    });
  });
//this will test the basics of the project schema in the db
  it('loads a project by id', function(done)
  {
    Project.create({_id:4,name:'important'}, function(err, doc)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/project/id/4';
      superagent.get(url,function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.project);
        assert.equal(result.project._id, 4);
        done();
      });
    });
  });
});
