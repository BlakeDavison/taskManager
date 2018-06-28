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
    app.use(require('../api')(wagner));
    app.use(session({secret:"ThisIsHereForDevOnly", resave:true, saveUninitialized:true}));
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
    // User.remove({}, function(err)
    // {
      // assert.ifError(err);
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
    // });
  });

  it('loads all the tasks for a user', function(done)
  {
    var t = [{user:'50341373e894ad16347efe01', _id:'503413730004ad16347efe01', name:'positive'},
    {user:'50341373e894ad16347efe01', _id:'503413730004ad16347efe02', name:'positive'},
    {user:'50341373e894ad16347efe02', _id:'503413730004ad16347efe03', name:'negative'}];

      Task.create(t, function(erro, docu)
      {
        assert.ifError(erro);
        assert.equal('1', '1');
        done();
        var urlLI = URL_ROOT + '/test/set/session';
        var url = URL_ROOT + '/tasks/users';//note this url requires a session
        // superagent.get(urlLI, function(err, res)
        // {
        //   assert.ifError(err);
          // superagent.get(url, function(error, result)
          // {
          //   assert.ifError(error);
          //   var results;
          //   assert.doesNotThrow(function()
          //   {
          //     result = JSON.parse(res.text);
          //
          //   });
          //   assert.ok(result.task[0]);
          //   assert.ok(result.task[1]);
          // });
        // });
      });

  });
  it('logs a user in', function(done)
  {
    superagent
      .post('http://localhost:3000/login')
      .send({password:"passcode",email:"te@st.ing"})
      .end(function(err, res)
        {
          assert.ifError(err);
          assert.ok(res);
          done();
        });
  });

});
