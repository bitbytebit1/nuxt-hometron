const { Router } = require('express')

const router = Router()

const controller = require('../controllers/open')

// Register routes
router.get('/open', controller.open)

module.exports = router
