const { Router } = require('express')

const router = Router()

const controller = require('../controllers/preview')

// Register routes
router.get('/preview', controller.preview)

module.exports = router
