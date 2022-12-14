module.exports = app => {
  const doc = require('../controllers/doc.controller.ts')
  const router = require('express').Router()
  // Create a new Doc
  router.post('/', doc.create)
  // Retrieve all Docs
  router.post('/gathering/:gatheringId', doc.findAll)
  // Retrieve Docs for an array of docIds
  router.post('/gathering/:gatheringId/docIds', doc.findByDocId)
  // Retrieve a single Doc with id
  router.get('/doc/:id', doc.findOne)
  // Update a Doc with id
  router.put('/doc/:id', doc.update)
  // Delete a Doc with id
  // router.delete('/:id', doc.deleteOne)
  // Delete all Doc
  // router.delete('/', doc.deleteAll)
  app.use('/api/doc', router)
}
