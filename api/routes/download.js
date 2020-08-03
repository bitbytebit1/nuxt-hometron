const { Router } = require('express')

const router = Router()

const controller = require('../controllers/download')

// Register routes
router.get('/download', controller.download)

module.exports = router
