// needs <= node 11.15.0
const url = require('url')
// const fs = require('fs')
const au = require('autoit')
// const screenshot = require('window-screenshot')
au.Init()
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

/*
  URL
    /api/autoit/mouse

  Parameters
    x,y - coordinates

  Return value
    HTTP 200 - Mouse moved

  Example
    http://localhost:3000/api/autoit/mouse?x=0&y=0
*/
module.exports.mouse = function (req, res) {
  /* eslint-disable-next-line */
  const position = url.parse(req.url, true).query
  const currentPos = au.MouseGetPos()
  const newPosition = { x: currentPos.x + (+position.x), y: currentPos.y + (+position.y) }
  const ret = au.MouseMove(newPosition.x, newPosition.y, 0)
  return res.status(200).json({ message: 'MouseMove', currentPos, position, newPosition, returnValue: ret })
}

/*
  URL
    /api/autoit/click

  Parameters
    button - which mouse button to click

  Return value
    HTTP 200 - Mouse clicked

  Example
    http://localhost:3000/api/autoit/click?button=left
*/
module.exports.click = function (req, res) {
  /* eslint-disable-next-line */
  const button = url.parse(req.url, true).query.button
  const ret = au.MouseClick(button)
  return res.status(200).json({ message: 'MouseClick', button, returnValue: ret })
}

module.exports.exec = function (req, res) {
  /* eslint-disable-next-line */
  const { command, params } = url.parse(req.url, true).query
  let ret
  if (Array.isArray(params)) {
    ret = au[command](...params)
  } else {
    ret = au[command](params)
  }
  console.log({ command, params, ret })
  return res.status(200).json({ command, params, ret })
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
    // for (let i = 0; i < windows.length; i++) {
    //   const element = windows[i]
    //   console.log('saving', element.title)
    //   screenshot(element.title, // 0 is for active window
    //     function (err, res) {
    //       if (err) { return console.log(err) }
    //       fs.writeFile(`${element.title}.png`, res)
    //     })
    // }
    return res.status(200).json(windows)
  })
}

/*
  URL
    /api/autoit/cast

  Parameters
    None

  Return value
    HTTP 200 - Started casting

  Example
    http://localhost:3000/api/autoit/cast
*/
module.exports.cast = function (req, res) {
  const path = require('path')
  const { exec } = require('child_process')
  const exePath = path.resolve('./autoit-scripts/CastDesktop.exe')
  exec(exePath, (error, stdout, stderr) => {
    if (error) {
      return
    }
    // for (let i = 0; i < windows.length; i++) {
    //   const element = windows[i]
    //   console.log('saving', element.title)
    //   screenshot(element.title, // 0 is for active window
    //     function (err, res) {
    //       if (err) { return console.log(err) }
    //       fs.writeFile(`${element.title}.png`, res)
    //     })
    // }
    return res.status(200).json({})
  })
}
