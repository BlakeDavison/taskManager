var mongoose = require('mongoose');

var projectSchema = {
  _id:{type:Number, required:true},
  name:{type:String, required: true},
  manager:{type:Number},
  description:{type:String}
};

module.exports = new mongoose.Schema(projectSchema);
module.exports.projectSchema = projectSchema;
