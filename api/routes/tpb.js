const { Router } = require('express')

const router = Router()

const controller = require('../controllers/tpb')

// Register routes
router.get('/tpb', controller.search)

module.exports = router
