const logger = require('../logger').getLogger('bookCountroller')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const { book: Book, book_instance: BookInstance } = require('../database/models')

// Display list of all BookInstances.
exports.bookinstance_list = async (req, res) => {
  const bookInstances = await bookInstance.findAll()
  res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: bookInstances })
}

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id)
}

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async (req, res) => {
  const books = await Book.findAll({ raw: true })
  // Successful, so render.
  res.render('book_instance_form', { title: 'Create BookInstance', book_list: books })
}

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [

  // Validate fields.
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('status').trim(),
  sanitizeBody('due_back').toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)
    // Create a BookInstance object with escaped and trimmed data.
    logger.info(`bookinstance_create_post: `, req.body)
    const bookInstance = { book_id: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
    }
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      const books = await Book.findAll({ row: true })
      return res.render('book_instance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookInstance.book.id, errors: errors.array(), bookinstance: bookInstance })
    }
    const newBookInstance = await BookInstance.create(bookInstance)
    newBookInstance['url'] = `/catalog/bookinstance/${newBookInstance.id}`
    // Data from form is valid.
    await newBookInstance.save()
    res.redirect(newBookInstance.url)
  }
]

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET')
}

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST')
}

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET')
}

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST')
}
