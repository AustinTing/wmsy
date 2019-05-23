const logger = require('../logger').getLogger('bookCountroller')
const { book, book_instance: bookInstance, author, genre } = require('../database/models')

// Display list of all BookInstances.
exports.bookinstance_list = async (req, res) => { 
  const bookInstances = await bookInstance.findAll()
  res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: bookInstances });
}

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id)
}

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create GET')
}

// Handle BookInstance create on POST.
exports.bookinstance_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create POST')
}

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
