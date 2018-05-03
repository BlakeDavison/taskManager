var mongoose = require('mongoose');
//creates the schema for validation for the category collection
var categorySchema = {
  username: {
    type: String,
    required: true
  },
  team:{
    type: Number
  }
};

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;
