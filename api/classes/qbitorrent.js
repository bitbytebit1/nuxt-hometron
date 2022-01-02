const open = require('open')
const queryString = require('qs')
const axiosLib = require('axios')

class QBittorrent {
  binPath = 'C:\\Program Files\\qBittorrent\\qBittorrent.exe'
  baseURL = 'http://localhost:4200'
  loginParams = { username: 'admin', password: '' }
  apiRoutes = {
    login: '/api/v2/auth/login',
    torrentAdd: '/api/v2/torrents/add'
  }

  constructor () {
    // Config Axios
    this.axios = axiosLib.create({
      baseURL: this.baseURL
    })
    this.axios.defaults.withCredentials = true
    this.open()
    this.login()
  }

  open () {
    return open(this.binPath)
  }

  addTorrent (magnetLink) {
    return this.axios.post(this.apiRoutes.torrentAdd, `urls=${magnetLink}&firstLastPiecePrio=true&sequentialDownload=true`).catch(console.log)
  }

  login () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      for (let index = 0; index < 10; index++) {
        const resp = await this.axios.post(this.apiRoutes.login, queryString.stringify(this.loginParams)).catch(console.log)
        const sessionCookie = resp?.headers?.['set-cookie']
        if (sessionCookie) {
          this.axios.defaults.headers.common.Cookie = sessionCookie
          console.log('Torrent: Logged in')
          resolve()
          break
        } else {
          console.log('Torrent: Failed to login, trying again', index)
          await sleep(1500)
        }
      }
    })
  }
}
const qbitorrent = new QBittorrent()

module.exports = qbitorrent

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
