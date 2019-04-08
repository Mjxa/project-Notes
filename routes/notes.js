const express = require('express');
const router = express.Router();
const fs = require('fs');
const sharp = require("sharp")



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
    if (req.headers['content-type'].split(";")[0]=='multipart/form-data'){
      var fstream;
      const transformer = sharp()
      .resize({
        width: 200,
        height: null,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      });
      note.img=decodeURI(req.get("fileName"))
      query = {_id: req.url.split("/")[req.url.split("/").length-1]}
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename) {
          console.log("Uploading: " + filename);  
          fstream = fs.createWriteStream("/app/public/img/" + filename);
          file.pipe(transformer).pipe(fstream);
          fstream.on('close', function () {
          console.log("File saved: " + filename);
          });
      });
    }else{
    let note = new Note();
    note.title = req.body.title;
    note.body = req.body.body;
    if(note.img) note.img=req.body
    note.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Note Added');
        res.redirect('/');
      }
    });
 } }
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
  let query
  // code for upload image to server and add img patch in mongoDB
  if (req.headers['content-type'].split(";")[0]=='multipart/form-data'){
  var fstream;
  const transformer = sharp()
  .resize({
    width: 200,
    height: null,
    fit: sharp.fit.cover,
    position: sharp.strategy.entropy
  });
  note.img=decodeURI(req.get("fileName"))
  query = {_id: req.url.split("/")[req.url.split("/").length-1]}
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading: " + filename);  
      fstream = fs.createWriteStream("./public/img/" + filename);
      file.pipe(transformer).pipe(fstream);
      fstream.on('close', function () {
      console.log("File saved: " + filename);
      });
  });

  }else{
  query = {_id: req.params.id};
  note.title = req.body.title;
  note.body = req.body.body;
  }

//Правка от Тараса 
  Note.updateOne(query, note, function(err){
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

//правка от Тараса

  Note.deleteOne(query, function(err){
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