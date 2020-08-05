// const { exec } = require('child_process')
const url = require('url')
const open = require('open')

/*
  URL
    /api/open

  Parameters
    file

  Return value
    HTTP 200 - File opened
    HTTP 400 - File not opened

  Example
    http://localhost:3000/api/open?dir=C:\Some.txt
*/

module.exports.open = function (req, res) {
  // Escape space or brackets
  /* eslint-disable-next-line */
  // const file = url.parse(req.url, true).query.file.replace(/([ |\(|\)])/g, '^$1')
  /* eslint-disable-next-line */
  const file = url.parse(req.url, true).query.file
  // exec(`open '${file}'`)
  open(file)
  return res.status(200).send({ message: `Opened ${file}` })
}
