// const { exec } = require('child_process')
const url = require('url')
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
  const { query, page, sortBy, category } = url.parse(req.url, true).query
  const ret = await searchByQuery(query, page, sortBy, category)
  return res.status(200).send(ret)
}

module.exports.getTorrentById = async function (req, res) {
  /* eslint-disable-next-line */
  const id = url.parse(req.url, true).query.id
  console.log('getting by ID', id)
  const ret = await getTorrentById(id)
  return res.status(200).send(ret)
}

// Modules
const request = require('request')
const cheerio = require('cheerio')

// 1337x.to base URL
const tpbURL = 'https://thepiratebay10.org'

function searchByQuery (keyword, page = 1, sortBy = '99', category = 0) {
  return new Promise((resolve, reject) => {
    const reqURL = tpbURL + '/search/' + keyword + `/${page}/${sortBy}/${category}`
    console.log(reqURL)
    const torrents = { meta: { currentPage: page, totalPages: 0 }, items: [] }
    request(reqURL, function (err, res, body) {
      if (err) {
        reject(err)
      }
      const $ = cheerio.load(body)
      torrents.meta.totalPages = $('table#searchResult tr').last().find('tr a:nth-last-child(2)').text() || 1
      $('table#searchResult tr').each(function (index, el) {
        const torrent = {}
        torrent.name = $(this).find('a.detLink').text()
        torrent.seeders = $(this).find('td:nth-child(3)').text()
        torrent.leechers = $(this).find('td:nth-child(4)').text()
        torrent.url = $(this).find('a.detLink').attr('href')
        torrent.magnetlink = $(this).find('td:nth-child(2)').find('a:nth-child(2)').attr('href')
        torrent.verified = $(this).find('img[title="VIP"]').attr('title') === 'VIP' || $(this).find('img[title="Trusted"]').attr('title') === 'Trusted'
        torrent.author = $(this).find('font a.detDesc').text() || 'Anonymous'
        torrent.link = $(this).find('div.detName a').attr('href') || ''
        if (torrent.name !== '') {
          torrent.category = {
            id:
              $(this)
                .find('center a')
                .first()
                .attr('href')
                .match(/\/browse\/(\d+)/)[1] || '',
            name: $(this)
              .find('center a')
              .first()
              .text()
          }

          torrent.subcategory = {
            id:
              $(this)
                .find('center a')
                .last()
                .attr('href')
                .match(/\/browse\/(\d+)/)[1] || '',
            name: $(this)
              .find('center a')
              .last()
              .text()
          }
          torrent.categoryFull = `${torrent.category.name} > ${torrent.subcategory.name}`
          torrent.uploaded = $(this).find('font').text().match(/Uploaded\s(.+?),/)[1] || ''
          torrent.size = $(this).find('font').text().match(/Size (.+?),/)[1]
          torrent.id = String(parseInt(/\/torrent\/(\d+)/.exec(torrent.link)[1] || '', 10))
          torrents.items.push(torrent)
        }
      })
      return resolve(torrents)
    })
  })
}
function getTorrentById (id) {
  const reqURL = tpbURL + '/torrent/' + id
  return new Promise((resolve) => {
    request(reqURL, function (err, res, body) {
      if (err) {
        resolve(err)
      }
      const $ = cheerio.load(body)
      const name = $('#title')
        .text()
        .trim()

      const size = $('dt:contains(Size:) + dd')
        .text()
        .trim()
      const uploadDate = $('dt:contains(Uploaded:) + dd')
        .text()
        .trim()
      const author = $('dt:contains(By:) + dd')
        .text()
        .trim()
      const authorLink = tpbURL + $('dt:contains(By:) + dd a').attr('href')
      const authorImg = $('dt:contains(By:) + dd img').attr('title')
      const authorVerified = authorImg === 'VIP' || authorImg === 'Trusted'
      const seeders = $('dt:contains(Seeders:) + dd')
        .text()
        .trim()
      const leechers = $('dt:contains(Leechers:) + dd')
        .text()
        .trim()
      const id = $('input[name=id]').attr('value') || ''
      const link = `${tpbURL}/torrent/${id}`
      const magnetlink = $('a[title="Get this torrent"]').attr('href') || ''
      const description =
          $('div.nfo')
            .text()
            .trim() || ''

      resolve({
        category: '',
        name,
        size,
        seeders,
        leechers,
        uploadDate,
        magnetlink,
        link,
        id,
        description,
        author,
        authorLink,
        authorVerified
      })
    })
  })
}
