const mongoose = require('mongoose');
const Project = require('./project');
const Schema = mongoose.Schema;

var sprintSchema = {
   _id:Schema.Types.ObjectId,
  name:{type:String, required: true},
  description:{type:String},
  due:{type:Date},
  started:{type:Boolean, default: false},
  project:{type:Schema.Types.ObjectId, ref:'Project'}
};

module.exports = new mongoose.Schema(sprintSchema);
module.exports.sprintSchema = sprintSchema;
