const _ = require('lodash')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const { author: Author, book: Book } = require('../database/models')
const logger = require('../logger').getLogger('authorController')
// Display list of all Authors.
exports.author_list = function (req, res) {
  res.send('NOT IMPLEMENTED: Author list')
}

// Display detail page for a specific Author.
exports.author_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id)
}

// Display Author create form on GET.
exports.author_create_get = function (req, res) {
  res.render('author_form', { title: 'Create Author' })
}

// Handle Author create on POST.
exports.author_create_post = [

  // Validate fields.
  body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
  body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('first_name').escape(),
  sanitizeBody('family_name').escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)
    if (!_.isEmpty(errors.array())) {
      logger.warn(errors.array())
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() })
    }
    const newAuthor = {
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    }
    logger.info(`author_create_post, new author: ${JSON.stringify(newAuthor)}`)

    // Data from form is valid.
    // Check if author with same name already exists.
    const dbAuthor = await Author.findOne({ where: newAuthor })
    if (dbAuthor) return res.redirect(dbAuthor.url)
    const createdAuthor = await Author.create(newAuthor)
    createdAuthor['url'] = `/catalog/author/${createdAuthor.id}`
    await createdAuthor.save()
    return res.redirect(createdAuthor.url)
  }

]

// Display Author delete form on GET.
exports.author_delete_get = async (req, res) => {
  const { id: authorId } = req.params
  const author = await Author.findOne({ where: { id: authorId }, raw: true })
  const authorBooks = await Book.findAll({ where: { author_id: authorId } })
  if (!author) { // No results.
    return res.redirect('/catalog/authors')
  }
  // Successful, so render.
  res.render('author_delete', { title: 'Delete Author', author: author, author_books: authorBooks })
}

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST')
}

// Display Author update form on GET.
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET')
}

// Handle Author update on POST.
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST')
}
