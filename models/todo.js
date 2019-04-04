const mongoose = require('mongoose');

// Todo schema
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body:  [{
      text : {
      type: String,
      required: true
    },
    checked : {
      type: Boolean,
      default: false,
      required: true
    }
     }]

});

const Todo = module.exports = mongoose.model('Todo', todoSchema);