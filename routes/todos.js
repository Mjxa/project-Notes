const express = require('express');
const router = express.Router();

// Todo model
const Todo = require('../models/todo');

// new todo form
router.get('/add', function(req, res){
  res.render('add_todo', {
    title: 'Add Todo list'
  });
});

// submit new todo 
router.post('/add', function(req, res){
  // Express validatord
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  
  // Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_todo', {
      title: 'Add Todo list',
      errors: errors
    });
  } else {
    let todo = new Todo();
    todo.title = req.body.title;
    todo.body = req.body.body;

    todo.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Todo list Added');
        res.redirect('/');
      }
    });
  }
});

// update submit new todo 
router.post('/edit/:id', function(req, res){
  let todo = {};
  todo.title = req.body.title;
  todo.body = req.body.body;
  let query = {_id: req.params.id};

  Todo.updateOne(query, todo, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Todo Updated')
      res.send('Success');
    }
  })
});

// Delete post
router.delete('/:id', function(req, res){
  let query = {_id: req.params.id};
  
//правка от Тараса
  Todo.deleteOne(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Todo Deleted')
      res.send('Success');
    }
  });
});

// get single todo
router.get('/:id', function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    res.render('todo', {
      title: todo.title,
      todos: todo.body,
      todo_id: todo._id

    });
  });
});

module.exports = router;