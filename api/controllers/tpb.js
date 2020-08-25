// const { exec } = require('child_process')
const url = require('url')
const Petrus = require('petrus')
const petrus = new Petrus.Petrus()
/*
  URL
    /api/tpb

  Parameters
    file

  Return value
    HTTP 200 - File deleted

  Example
    http://localhost:3000/api/tpb?q=the best song in the world
*/

module.exports.search = async function (req, res) {
  /* eslint-disable-next-line */
  const q = url.parse(req.url, true).query.q
  console.log('searching for', q)
  const ret = await petrus.search(q)
  return res.status(200).send(ret)
}
