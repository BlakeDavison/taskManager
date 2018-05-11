var mongoose = require('mongoose');
var Project = require('./project');
var Schema = mongoose.Schema;

var sprintSchema = {
  name:{type:String, required: true},
  function:{type:String},
  due:{type:Date},
  start:{type:Date},
  project:{type:Schema.Types.ObjectId, ref:'Project', index:true}
};

module.exports = new mongoose.Schema(sprintSchema);
module.exports.sprintSchema = sprintSchema;
