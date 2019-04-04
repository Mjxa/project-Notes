const mongoose = require('mongoose');

// Note schema
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Note = module.exports = mongoose.model('Note', noteSchema);