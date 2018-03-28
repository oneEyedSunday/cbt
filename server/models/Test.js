const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// include subject it belongs to

const testSchema = new Schema({
  title: {type: String, required: true},
  questions: [{
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
  }],
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  }
});


module.exports = mongoose.model('Test', testSchema);
