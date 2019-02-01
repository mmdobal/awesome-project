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

module.exports = router;
