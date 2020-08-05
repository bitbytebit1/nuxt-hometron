const express = require('express')
const app = express()

// browse routes
const browse = require('./routes/browse')
const download = require('./routes/download')
const open = require('./routes/open')
const autoit = require('./routes/autoit')
const preview = require('./routes/preview')

// register browse route
app.use(browse)
app.use(download)
app.use(open)
app.use(autoit)
app.use(preview)

app.get('/', function (req, res) {
  res.json({
    home: {
      egUrl: 'http://localhost:3000/api/',
      desc: 'Home page, lists available routes'
    autoitSend: {
      egUrl: 'http://localhost:3000/api/autoit/send?key={UP}',
      params: 'key - key to send',
      desc: 'Sends one or more keys'
    },
    browse: {
      egUrl: 'http://localhost:3000/api/browse?dir=c:\\users',
      params: 'dir - folder to browse',
      desc: 'List of files and folders'
    },
    drives: {
      egUrl: 'http://localhost:3000/api/drives',
      params: 'none',
      desc: 'Lists available drives'
    },
    open: {
      egUrl: 'http://localhost:3000/api/open?file=c:\\Some.txt',
      params: 'file - file to execute',
      desc: 'Lists available routes'
    preview: {
      egUrl: 'http://localhost:3000/api/preview?file=c:\\Some.txt',
      params: 'file - a file to preview',
      desc: 'Preview a file'
    }
  })
})

module.exports = {
  path: '/api/',
  handler: app
}
