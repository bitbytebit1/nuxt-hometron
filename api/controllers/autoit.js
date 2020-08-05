// needs <= node 11.15.0
const url = require('url')
const au = require('autoit')
/*
  URL
    /api/autoit/send

  Parameters
    key - key sequence to be pressed

  Return value
    HTTP 200 - Key sent

  Example
    http://localhost:3000/api/autoit/send?key={VOLUME_UP}
*/
module.exports.send = function (req, res) {
  /* eslint-disable-next-line */
  const key = url.parse(req.url, true).query.key
  const ret = au.Send(key)
  return res.status(200).json({ message: 'Sent', key, returnValue: ret })
}
