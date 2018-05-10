var mongoose = require('mongoose');
//var Project = require('./project');
//var Schema = mongoose.Schema;

var userSchema = {

  name:{type:String, required: true},
  team:{type:Number},
//  projects:[Project.projectSchema]
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
