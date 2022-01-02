const qbitorrent = require('../classes/qbitorrent')

/*
  URL
    /api/qbitorrent/add

  Parameters
    magnetLink

  Return value
    HTTP 200 - File deleted

  Example
    http://localhost:3000/api/tpb?q=the best song in the world
*/

module.exports.add = async function (req, res) {
  const { magnetlink, name } = req.body
  console.log('Adding: ', name)
  const response = await qbitorrent.addTorrent(magnetlink)
  return res.status(200).send(response.data)
}
