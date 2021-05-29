// const { exec } = require('child_process')
const url = require('url')
const trash = require('trash')

/*
  URL
    /api/delete

  Parameters
    file

  Return value
    HTTP 200 - File deleted

  Example
    http://localhost:3000/api/delete?file=C:\Some.txt
*/

module.exports.delete = async function (req, res) {
  /* eslint-disable-next-line */
  const file = decodeURIComponent(url.parse(req.url, true).search.split('?file=')[1])
  await trash(file)
  return res.status(200).send({ message: `Deleted ${file}` })
}
