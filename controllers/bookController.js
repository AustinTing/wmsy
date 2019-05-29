const _ = require('lodash')
// const r = require('ramda')
const { body, validationResult } = require('express-validator/check')
// const { sanitizeBody } = require('express-validator/filter')
const logger = require('../logger').getLogger('bookCountroller')
const { book: Book, book_instance: bookInstance, author, genre } = require('../database/models')

exports.index = async (req, res) => {
  const data = _.zipObject([
    'book_count',
    'book_instance_count',
    'book_instance_available_count',
    'author_count', 'genre_count'],
  await Promise.all([
    Book.count(),
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
    book_list: await Book.findAll()
  }
  res.render('book_list', data)
}

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id)
}

const toAuthor = author => {
  author['name'] = author.first_name + ', ' + author.family_name
  return author
}

const findAuthor = async () => {
  const dbAuthors = await author.findAll({ raw: true })
  return _.map(dbAuthors, toAuthor)
}

// Display book create form on GET.
exports.book_create_get = async (req, res) => {
  logger.info(`book_create_get: `, req.app.get('envTitle'))
  logger.info(`book_create_get`)
  const dataKeys = ['authors', 'genres']
  const dataValues = await Promise.all([findAuthor(), genre.findAll({ raw: true })])
  const data = _.zipObject(dataKeys, dataValues)
  res.render('book_form', { title: 'Create Book', ...data }) // if no ...data -> {data}, cause fail
}

// Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    logger.info(`req.body.genre: `, req.body.genre, `, type: `, typeof req.body.genre)
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') {
        req.body.genre = []
      } else {
        req.body.genre = new Array(req.body.genre)
      }
    }
    next()
  },
  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)
    const genreStr = _.join(req.body.genre, '|')
    // Create a Book object with escaped and trimmed data.
    var book = {
      title: req.body.title,
      author_id: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: genreStr
    }
    logger.info(`book_create_post`, book)
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      // Get all authors and genres for form.
      const dataKeys = ['authors', 'genres']
      const dataValues = await Promise.all([findAuthor(), genre.findAll({ raw: true })])
      const data = _.zipObject(dataKeys, dataValues)
      _.map(data.genres, genre => {
        if (book.genre.indexOf(genre.id) > -1) {
          genre['checked'] = 'true'
        }
      })
      res.render('book_form', { title: 'Create Book', ...data, book, errors: errors.array() })
    } else {
      const dbBook = await Book.findOne({ where: book })
      logger.info(dbBook)
      if (dbBook) return res.redirect(dbBook.url)
      const newBook = await Book.create(book)
      newBook['url'] = `/catalog/book/${newBook.id}`
      newBook.save()
      return res.redirect(newBook.url)
    }
  }
]

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
