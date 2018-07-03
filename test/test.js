const assert = require('assert');
const express = require('express');
const superagent = require('superagent');
const wagner = require('wagner-core');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

const URL_ROOT = 'http://localhost:3000';
describe('API', function(){
  var server;
  var User;
  var Task;
  var Project;
  var Sprint;

  before(function()
  {//Inital server setup
    var app = express();

    models = require('../models/models')(wagner);
    app.use(bodyParser.json());
    app.use(session({secret:"ThisIsHereForDevOnly", resave:true, saveUninitialized:true}));
    app.use(require('../api')(wagner));
    server = app.listen(3000);
    //Make the models avalible for the tests
    User = models.User;
    Task = models.Task;
    Project = models.Project;
    Sprint = models.Sprint;
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
            Sprint.remove({}, function(err)
            {
              assert.ifError(err);
              done();
            });
          });
        });
    });
  });
  it('creates a new user', function(done)
  {
    superagent
      .post('http://localhost:3000/users')
      .send({email:"the@te.st", password:"asdfjkl"})
      .end(function(err, res)
      {
        assert.ifError(err);
        assert.ok(res);
        done();
      });
  });
  it('logs a user in', function(done)
  {
    superagent
      .post('http://localhost:3000/users')
      .send({email:"the@te.st", password:"asdfjkl"})
      .end(function(err, res)
      {
        assert.ifError(err);
        assert.ok(res);
        done();
      });
    superagent
      .post('http://localhost:3000/login')
      .send({email:"the@te.st", password:"asdfjkl"})
      .end(function(err, res)
        {
          assert.ifError(err);
          assert.ok(res);
          done();
        });
  });

});
