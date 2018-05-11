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
    User.create({_id:'50341373e894ad16347efe01', name:'some one'}, function(err, doc)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/user/id/50341373e894ad16347efe01';
      superagent.get(url, function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.user);
        assert.equal(result.user._id, '50341373e894ad16347efe01');
        done();
      });
    });
  });
/*this will test the basics of the task schema in the db*/
  it('loads a task by ID', function(done)
  {
    Task.create({_id:'50341373e894ad16347efe02', name:'do this'}, function(err, doc)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/task/id/50341373e894ad16347efe02';
      superagent.get(url, function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.task);
        assert.equal(result.task._id, '50341373e894ad16347efe02');
        done();
      });
    });
  });
//this will test the basics of the project schema in the db
  it('loads a project by id', function(done)
  {
    Project.create({_id:'50341373e894ad1634700003', name:'important'}, function(err, doc)
    {
      assert.ifError(err);
      var url = URL_ROOT + '/project/id/50341373e894ad1634700003';
      superagent.get(url,function(err, res)
      {
        assert.ifError(err);
        var result;
        assert.doesNotThrow(function()
        {
          result = JSON.parse(res.text);
        });
        assert.ok(result.project);
        assert.equal(result.project._id, '50341373e894ad1634700003');
        done();
      });
    });
  });
//this will test the ability to get the person id from a taskSchema
  it('loads all the task that are assigned to one person', function(done)
  {
    var tasksHold = [
      {_id:'40341373e894ad16347efe01', name:'one', user:'60341373e894ad16347efe01' },
      {_id:'40341373e894ad16347efe02', name:'two', user:'60341373e894ad16347efe01'  },
      {_id:'40341373e894ad16347efe03', name:'three', user:'60341373e894ad16347efe02' },
      {_id:'40341373e894ad16347efe04', name:'four'}
    ];
    var userHold = [
      {_id:'50341373e894ad16347efe06', name:'this one'},
      {_id:'50341373e894ad16347efe07', name:'not this'}
    ];
    User.create(userHold, function(err, user)
    {
      assert.ifError(err);
      Task.create(tasksHold, function(err, task)
      {
        assert.ifError(err);
        var url = URL_ROOT + '/task/person/60341373e894ad16347efe01';
        superagent.get(url,function(err, res)
        {
          assert.ifError(err);
          var result;
          assert.doesNotThrow(function()
          {
            result = JSON.parse(res.text);
          });
          assert.ok(result.tasks[0]);
          assert.equal(result.tasks[0]._id, '40341373e894ad16347efe01');
          assert.equal(result.tasks[1]._id, '40341373e894ad16347efe02');
          done();
        });
      });
    });
  });
//getting all the projects that one person is on
//  it('loads all of the tasks that one person has', function(done){});

});
