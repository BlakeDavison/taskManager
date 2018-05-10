var mongoose = require('mongoose');
var User = require('./user');


var projectSchema = {

  name:{type:String, required: true},
  //user:User.userSchema,
  description:{type:String},
  due:{type:Date}
};

module.exports = new mongoose.Schema(projectSchema);
module.exports.projectSchema = projectSchema;
