const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// include tests

const subjectSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true
  }
});


module.exports = mongoose.model('Subject', subjectSchema);
