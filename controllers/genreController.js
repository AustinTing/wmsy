const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const { genre } = require('../database/models')

// Display list of all Genre.
exports.genre_list = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre list')
}

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id)
}

// Display Genre create form on GET.
exports.genre_create_get = function (req, res, next) {
  res.render('genre_form', { title: 'Create Genre' })
}

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate that the name field is not empty.
  body('name', 'Genre name required').isLength({ min: 1 }).trim(),
  // Sanitize (trim and escape) the name field.
  sanitizeBody('name').trim().escape(),
  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)
    // Create a genre object with escaped and trimmed data.
    const newGenre = {
      name: req.body.name
    }
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('genre_form', { title: 'Create Genre', genre, errors: errors.array() })
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const dbGenre = await genre.findOne({ where: { name: req.body.name } })
      if (dbGenre) return res.redirect(dbGenre.url)
      const createdGenre = await genre.create(newGenre)
      createdGenre['url'] = `/catalog/genre/${createdGenre.id}`
      await createdGenre.save()
      return res.redirect(createdGenre.url)
    }
  }
]

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET')
}

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST')
}

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET')
}

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST')
}
