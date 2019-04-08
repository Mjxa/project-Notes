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
  },
  img: {
    type: String,
    required: false
  }
});

const Note = module.exports = mongoose.model('Note', noteSchema);