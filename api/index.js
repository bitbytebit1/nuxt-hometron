const express = require('express')
const app = express()

// browse routes
const browse = require('./routes/browse')
const download = require('./routes/download')
const open = require('./routes/open')

// register browse route
app.use(browse)
app.use(download)
app.use(open)

app.get('/', function (req, res) {
  res.json({
    home: {
      egUrl: 'http://localhost:8000/api/',
      desc: 'Home page, lists available routes'
    },
    browse: {
      egUrl: 'http://localhost:8000/api/browse?dir=c:\\users',
      params: 'dir - folder to browse',
      desc: 'List of files and folders'
    },
    drives: {
      egUrl: 'http://localhost:8000/api/drives',
      params: 'none',
      desc: 'Lists available drives'
    },
    open: {
      egUrl: 'http://localhost:8000/api/open?file=c:\\Some.txt',
      params: 'file - file to execute',
      desc: 'Lists available routes'
    }
  })
})

module.exports = {
  path: '/api/',
  handler: app
}
