const express = require('express');
const router = express.Router();

// Note model
const Note = require('../models/note');

// new note form
router.get('/add', function(req, res){
  res.render('add_note', {
    title: 'Add Note'
  });
});

// submit new note 
router.post('/add', function(req, res){
  // Express validatord
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  
  // Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_note', {
      title: 'Add Note',
      errors: errors
    });
  } else {
    let note = new Note();
    note.title = req.body.title;
    note.body = req.body.body;

    note.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Note Added');
        res.redirect('/');
      }
    });
  }
});

// load edit form
router.get('/edit/:id', function(req, res){
  Note.findById(req.params.id, function(err, note){
    res.render('edit_note', {
      title: 'Edit Note',
      note: note
    });
  });
});

// update submit new note 
router.post('/edit/:id', function(req, res){
  let note = {};
  note.title = req.body.title;
  note.body = req.body.body;

  let query = {_id: req.params.id};

  Note.update(query, note, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Note Updated');
      res.redirect('/');
    }
  })
});

// Delete post
router.delete('/:id', function(req, res){
  let query = {_id: req.params.id};

  Note.remove(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Note Deleted')
      res.send('Success');
    }
  });
});

// get single note
router.get('/:id', function(req, res){
  Note.findById(req.params.id, function(err, note){
    res.render('note', {
      note: note
    });
  });
});

module.exports = router;