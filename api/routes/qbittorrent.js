const router = require('express').Router()

const controller = require('../controllers/qbittorrent')

// Register routes
router.post('/qbittorrent/add', controller.add)

module.exports = router
