var mongoose = require('mongoose');

var projectSchema = {
  _id:{type:Number, required:true},
  name:{type:String, required: true},
  manager:{type:Number, required: true}
};

module.exports = new mongoose.Schema(projectSchema);
module.exports.projectSchema = projectSchema;
