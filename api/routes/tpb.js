const { Router } = require('express')

const router = Router()

const controller = require('../controllers/tpb')

// Register routes
router.get('/tpb/search', controller.search)
router.get('/tpb/id', controller.getTorrentById)

module.exports = router
