/* eslint-disable */
import { File } from '../models/file.js'
import { Disk } from '../models/disk.js'
const fs = require('fs')
const url = require('url')
const path = require('path')
const querystring = require('querystring')
const nodeDiskInfo = require('node-disk-info')
/*
  URL
    /api/browse

  Parameters
    dir

  Return value
    Array of files and their sizes

  Example
    http://localhost:3000/api/browse?dir=C:\Users
*/
module.exports.browse = function (req, res) {
  /* eslint-disable-next-line */
  const folder = decodeURIComponent(url.parse(req.url, true).search.split('?dir=')[1])
  console.log(folder)
  if (!folder) {
    return res.status(400).json({ error: 'dir parameter empty' })
  }
  const sorter = (a, b) => {
    const textA = a.name.toUpperCase()
    const textB = b.name.toUpperCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  }
  const ls = getFileInfoFromFolder(folder)
  const directories = ls.filter(row => row.isDirectory).sort(sorter)
  const files = ls.filter(row => row.isFile).sort(sorter)
  const ret = directories.concat(files)

  return res.status(200).json(ret)
}

/*
  URL
    /api/drives

  Parameters
    None

  Return value
    Array of drives

  Example
    http://localhost:3000/api/drives
*/
module.exports.drives = async function (req, res) {
  const ret = await getDrives()
  return res.status(200).json(ret)
}

const getFileInfoFromFolder = (folder) => {
  // list all files and folders
  const files = fs.readdirSync(folder, 'utf8')
  // map to file class
  const response = files.map((file) => {
    try {
      // get file/folder stats
      const stats = fs.statSync(folder + file)
      return new File({
        name: path.parse(file).name,
        extension: path.parse(file).ext,
        fullPath: folder + file,
        fullName: file,
        path: folder,
        size: stats.size,
        created: stats.birthtimeMs,
        modified: stats.mtimeMs,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory()
      })
    } catch (e) {
      // console.log(e)
      return new File({
        name: path.parse(file).name,
        extension: path.parse(file).ext,
        fullPath: folder + file,
        fullName: file,
        path: folder,
        size: 'FILE BUSY',
        created: 'FILE BUSY',
        modified: 'FILE BUSY',
        isFile: 'FILE BUSY',
        isDirectory: 'FILE BUSY'
      })
    }
  })
  // console.log(response)
  return response
}

function getDrives (params) {
  return new Promise((resolve, reject) => {
    try {
      const disks = nodeDiskInfo.getDiskInfoSync()
      const ret = disks.map((row) => {
        return new Disk({
          name: row._mounted,
          fullPath: row._mounted,
          type: row._filesystem,
          spaceAvailable: row._available,
          spaceUsed: row._used,
          spaceTotal: row._capacity
        })
      })
      resolve(ret)
    } catch (e) {
      reject(e)
      console.error(e)
    }
  })
}
