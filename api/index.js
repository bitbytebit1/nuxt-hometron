const express = require('express')
const cors = require('cors')
const app = express()

// Require & Import API routes
const browse = require('./routes/browse')
const download = require('./routes/download')
const open = require('./routes/open')
const autoit = require('./routes/autoit')
const preview = require('./routes/preview')
const deleteRoute = require('./routes/delete')
const tpb = require('./routes/tpb')
const qbittorent = require('./routes/qbittorrent')

// Use CORS
app.use(cors())

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// register routes
app.use(browse)
app.use(download)
app.use(open)
app.use(autoit)
app.use(preview)
app.use(deleteRoute)
app.use(tpb)
app.use(qbittorent)

app.get('/', function (req, res) {
  res.json({
    home: {
      url: 'http://localhost:3000/api/',
      desc: 'Lists available routes'
    },
    autoitSend: {
      url: 'http://localhost:3000/api/autoit/send?key={UP}',
      params: 'key - key to send',
      desc: 'Sends one or more keys'
    },
    browse: {
      url: 'http://localhost:3000/api/browse?dir=c:\\users',
      params: 'dir - folder to browse',
      desc: 'List of files and folders'
    },
    download: {
      url: 'http://localhost:3000/api/download?file=c:\\Some.txt',
      params: 'file - a file to download',
      desc: 'Download a file'
    },
    drives: {
      url: 'http://localhost:3000/api/drives',
      params: 'none',
      desc: 'Lists available drives'
    },
    open: {
      url: 'http://localhost:3000/api/open?file=c:\\Some.txt',
      params: 'file - file or url to execute',
      desc: 'Opens a file or url'
    },
    preview: {
      url: 'http://localhost:3000/api/preview?file=c:\\Some.txt',
      params: 'file - a file to preview',
      desc: 'Preview a file'
    },
    delete: {
      url: 'http://localhost:3000/api/delete?file=c:\\Some.txt',
      params: 'file - a file or folder to delete',
      desc: 'Send a file to the recycle bin'
    }
  })
})

module.exports = app
