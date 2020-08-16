const { Router } = require('express')

const router = Router()

const controller = require('../controllers/delete')

// Register routes
router.get('/delete', controller.delete)

module.exports = router
