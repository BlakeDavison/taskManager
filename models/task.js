var mongoose = require('mongoose');
var User = require('./user');
var Project = require('./project');


var taskSchema = {
  name: { type: String, required: true },
  due:{type: Date, default: Date.now},
  progres:{//automate the updated when assigned
    type:String,
    enum:['IDed', 'Assigned', 'Start', 'Done'],
    default:'IDed'
  },
  assigned: {type:Number},
  projectName: {type:Number},
  description: {type:String},
  dependentTasks:[{type:Number, ref:'task'}]
};

var schema = new mongoose.Schema(taskSchema);

module.exports = schema;
module.exports.taskSchema = taskSchema;
