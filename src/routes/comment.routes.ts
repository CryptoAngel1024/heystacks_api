module.exports = app => {
  const comment = require('../controllers/comment.controller.ts')
  const router = require('express').Router()
  // Create a new comment
  router.post('/', comment.create)
  // Retrieve all comments for a doc
  router.get('/doc/:id', comment.findAll)
  // Delete a comment with id
  router.delete('/:id', comment.deleteOne)
  // Delete all comment
  // router.delete('/', comment.deleteAll)
  app.use('/api/comment', router)
}
