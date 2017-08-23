const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: {type: String,required: true },
  subject: {
    type: Schema.ObjectId,
    ref: 'Subject',
    required: true
  },
  // perhaps make the answer a type of optionSchema
  // to ensure theres an answer
  answer: {type: String, required: true},
  options: [{
    type: Schema.ObjectId,
    ref: 'Option',
    required: true
  }]

});


module.exports = mongoose.model('Question', questionSchema);
