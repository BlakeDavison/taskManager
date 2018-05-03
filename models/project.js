var mongoose = require('mongoose');

var projectSchema = {//basic schema build for validation
  name: { type: String, required: true, unique:true },
  team: {type: Number},
  due: {type: Date},
  description: {type: String}
};

var schema = new mongoose.Schema(projectSchema);

module.exports = schema;
module.exports.projectSchema = projectSchema;
