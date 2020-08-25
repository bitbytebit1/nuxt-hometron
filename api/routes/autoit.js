const { Router } = require('express')

const router = Router()

const controller = require('../controllers/autoit')

// Register routes
router.get('/autoit/send', controller.send)
router.get('/autoit/winlist', controller.winlist)
router.get('/autoit/exec', controller.exec)
router.get('/autoit/mouse', controller.mouse)
router.get('/autoit/click', controller.click)

module.exports = router
