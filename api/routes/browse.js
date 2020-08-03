const { Router } = require('express')

const router = Router()

const controller = require('../controllers/browse')

// Register routes
router.get('/drives', controller.drives)

router.get('/browse', controller.browse)

module.exports = router
