const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: {type: String, required: true},
  questions: [{
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
  }]
});


module.exports = mongoose.model('Test', testSchema);
