const { Router } = require('express')

const router = Router()

const controller = require('../controllers/autoit')

// Register routes
router.get('/autoit/send', controller.send)
// router.get('/autoit/exec', controller.index)

module.exports = router
