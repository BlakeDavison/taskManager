var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var projectSchema = {

  name:{type:String, required: true},
  manager:{type:Schema.Types.ObjectId, ref:'User'},
  description:{type:String},
  due:{type:Date}
};

module.exports = new mongoose.Schema(projectSchema);
module.exports.projectSchema = projectSchema;
