// const fs = require('fs')
// const path = require('fs')
// const https = require('https')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

// const options = {
//   cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
//   key: fs.readFileSync(path.resolve(__dirname, 'key.pem'))
// }

// browse routes
const browse = require('./routes/browse')
const download = require('./routes/download')
const open = require('./routes/open')
const autoit = require('./routes/autoit')
const preview = require('./routes/preview')
const deleteRoute = require('./routes/delete')
const tpb = require('./routes/tpb')

// register browse route
app.use(browse)
app.use(download)
app.use(open)
app.use(autoit)
app.use(preview)
app.use(deleteRoute)
app.use(tpb)

app.get('/', function (req, res) {
  res.json({
    home: {
      egUrl: 'http://localhost:3000/api/',
      desc: 'Lists available routes'
    },
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
    download: {
      egUrl: 'http://localhost:3000/api/download?file=c:\\Some.txt',
      params: 'file - a file to download',
      desc: 'Download a file'
    },
    drives: {
      egUrl: 'http://localhost:3000/api/drives',
      params: 'none',
      desc: 'Lists available drives'
    },
    open: {
      egUrl: 'http://localhost:3000/api/open?file=c:\\Some.txt',
      params: 'file - file or url to execute',
      desc: 'Opens a file or url'
    },
    preview: {
      egUrl: 'http://localhost:3000/api/preview?file=c:\\Some.txt',
      params: 'file - a file to preview',
      desc: 'Preview a file'
    },
    delete: {
      egUrl: 'http://localhost:3000/api/delete?file=c:\\Some.txt',
      params: 'file - a file or folder to delete',
      desc: 'Send a file to the recycle bin'
    }
  })
})

// const server = https.createServer(options, app)
// server.listen(8001, function () {
//   console.log('server running at https://IP_ADDRESS:8001/')
// })

module.exports = {
  path: '/api/',
  handler: app
}
