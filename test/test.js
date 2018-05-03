var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('User API', function(){
  var server;
  var User;

  before(function()
  {//Inital server setup
    var app = express();

    models = require('../models/models')(wagner);
    app.use(require('../api')(wagner));

    server = app.listen(3000);
    //Make the models avalible for the tests
    User = models.User;
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
      done();
    });
  });

  it('load a user by ID', function(done)
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

});
