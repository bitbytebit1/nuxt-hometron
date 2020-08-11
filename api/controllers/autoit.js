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
module.exports.winlist = function (req, res) {
  const path = require('path')
  const { exec } = require('child_process')
  const exePath = path.resolve('./autoit-scripts/winlist.exe')
  exec(exePath, (error, stdout, stderr) => {
    if (error) {
      return
    }
    const data = stdout.trim()
    const list = data.split('|[~_~]|')
    const windows = []
    for (const i in list) {
      const item = list[i]
      if (`${item}`.includes('[~_~]')) {
        const options = item.split('[~_~]')
        if (options.length >= 2) {
          windows.push({ title: options[0], handle: options[1] })
        }
      }
    }
    return res.status(200).json(windows)
  })
}
