const fs = require('fs')
const url = require('url')
// const path = require('path')
const mime = require('mime')

module.exports.preview = function (req, res) {
  /* eslint-disable-next-line */
  const file = decodeURIComponent(url.parse(req.url, true).search.split('?file=')[1])
  // const filename = path.basename(file)
  const mimetype = mime.getType(file)

  // res.setHeader('Content-disposition', 'attachment; filename=' + filename)
  res.setHeader('Content-type', mimetype)

  const filestream = fs.createReadStream(file)
  filestream.pipe(res)
}
