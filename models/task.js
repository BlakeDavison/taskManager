var mongoose = require('mongoose');

var taskSchema =
{
  _id{type: Number, required:true},
  name:{type:String, required: true},
  due:{type:Date},
  progress:
  {
    type:String,
    enum:['IDed', 'Assigned', 'Start', 'Stuck', 'Done'],
    default:'IDed'
  },
  assigned: {type:Number},
  project: {type:Number},
  description:{type:String},
  dependentTasks:[{type:Number, ref:'task'}]
};

var schema = new mongoose.Schema(taskSchema);

module.exports = schema;
module.exports.taskSchema = taskSchema;
