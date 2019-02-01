const express = require('express');
const router  = express.Router();
const BookModel = require('../models/Book.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  BookModel.find()
    .then(returnedBooks => {
      res.render("booksList", { booksList: returnedBooks });
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  BookModel.findOne({'_id': bookId})
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/books/add', (req, res, next) => {
  res.render("book-add");
});

router.post('/books/add', (req, res, next) => {
  const { title, author, description, rating } = req.body; // desconstrução de obj
  const newBook = new BookModel({ title, author, description, rating});
  newBook.save()
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
  })
});

router.get('/books/edit/:id', (req, res, next) => {
  BookModel.findOne({ "_id": req.params.id })
    .then((book) => {
      res.render("book-edit", { book });
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/books/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  BookModel.update({_id: req.query.bookId}, { $set: {title, author, description, rating }})
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  })
});

router.get('/books/del/:id', (req, res, next) => {
  BookModel.deleteOne({ "_id": req.params.id })
    .then(() => {
      res.redirect('/books');
    })
    .catch(err => {
      console.log(err);
    })
});



module.exports = router;
