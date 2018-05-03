//NEED TO BE CHANGED
var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Category API', function() {
  var server;
  var Category;
  var Product;

  before(function() {//sets up the server
    var app = express();

    // Bootstrap server
    models = require('../models/models')(wagner);
    app.use(require('../api')(wagner));

    server = app.listen(3000);

    // Make models available in tests
    Category = models.Category;
    Product = models.Product;
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure categories are empty before each test
    Category.remove({}, function(error) {
      assert.ifError(error);
      Product.remove({}, function(error) {
        assert.ifError(error);
        done();
      });
    });
  });

  it('can load a task by id', function(done) {
    // Create a single product
    var TASK_ID = '000000000000000000000001';
    var task = {
      name: 'do stuff',
      _id: TASK_ID,
    };
    Task.create(task, function(err, doc) {
      assert.ifError(err);
      var url = URL_ROOT + '/task/id/' + TASK_ID;
      // Make an HTTP request to
      // "localhost:3000/product/id/000000000000000000000001"
      superagent.get(url, function(err, res) {
        assert.ifError(err);
        var result;
        // And make sure we got the LG G4 back
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.ok(result.teak);
        assert.equal(result.task._id, TASK_ID);
        assert.equal(result.task.name, 'do stuff');
        done();
      });
    });
  });

  it('can load a user by id', function(done) {
    // Create a single product
    var USER_ID = '000000000000000000000001';
    var User = {
      name: 'Some One',
      _id: USER_ID,
    };
    User.create(user, function(err, doc) {
      assert.ifError(err);
      var url = URL_ROOT + '/task/id/' + USER_ID;
      // Make an HTTP request to
      // "localhost:3000/product/id/000000000000000000000001"
      superagent.get(url, function(err, res) {
        assert.ifError(err);
        var result;
        // And make sure we got it
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.ok(result.teak);
        assert.equal(result.user._id, USER_ID);
        assert.equal(result.user.name, 'Some One');
        done();
      });
    });
  });
});
