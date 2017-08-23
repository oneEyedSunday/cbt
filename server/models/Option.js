/**
  Option model
  An option is a potential answer
  ypu choose from numerous options
  in an mcq
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  text: {type: String, required: true}
});

module.exports = mongoose.model('Option', optionSchema);
