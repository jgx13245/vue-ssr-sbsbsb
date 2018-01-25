const http = require('http')
const url = require('url')
const config = require('../config')
const responseCode = require('../util/response-code')

/**
 * 上传图片
 */
exports.image = (req, res) => {
  const {hostname, port, path} = url.parse(config.uploadURL)
  const request = http.request({
    host: hostname,
    port,
    path,
    method: 'POST',
    headers: req.headers
  }, response => {
    let data = ''
    response.on('data', chunk => {
      data += chunk
    })
    response.on('end', () => {
      data = JSON.parse(data)
      if (data.state === '000000') {
        return res.json({
          code: responseCode.SUCCESS,
          message: data.showMessage,
          path: data.body.length === 1 ?  data.body.shift().path : data.body.map(item => item.path)
        })
      }
      res.json({
        code: responseCode.ERROR,
        message: data.showMessage
      })
    })
  })

  request.on('error', err => {
    res.json({
      code: responseCode.ERROR,
      message: err.message
    })
  })
  req.pipe(request)
}
