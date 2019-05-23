const _ = require('lodash')
const logger = require('../logger').getLogger('bookCountroller')
const { book, book_instance: bookInstance, author, genre } = require('../database/models')

exports.index = async (req, res) => {
  const data = _.zipObject([
    'book_count',
    'book_instance_count',
    'book_instance_available_count',
    'author_count', 'genre_count'],
  await Promise.all([
    book.count(),
    bookInstance.count(),
    bookInstance.count({ where: { status: 'Available' } }),
    author.count(),
    genre.count()
  ]))
  logger.debug(data)
  res.render('index', { title: 'lalala', data })
}

// Display list of all books.
exports.book_list = async (req, res) => {
  const data = {
    title: 'Book List',
    book_list: await book.findAll()
  }
  res.render('book_list', data)
}

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id)
}

// Display book create form on GET.
exports.book_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET')
}

// Handle book create on POST.
exports.book_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create POST')
}

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET')
}

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST')
}

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update GET')
}

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST')
}
