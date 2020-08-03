const { exec } = require('child_process')

const url = require('url')

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
  /* eslint-disable-next-line */
  const file = url.parse(req.url, true).query.file
  exec(file)
  return res.status(200).send(`Opened ${file}`)
}
