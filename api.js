var express = require('express');
var status = require('http-status');

module.exports = function(wagner)
{
  var api = express.Router();

  api.get('/user/id/:id', wagner.invoke(function(User)
  {
    return function(req, res)
    {
      User.findOne({_id: req.params.id}, function(err, user)
      {
        if(err)
        {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({error: err.toString()});
        }
        if(!user)
        {
          return res.
            status(status.NOT_FOUND).
            json({error: 'Not Found'});
        }
        res.json({user: user});
      });
    };
  }));
  return api;
};
