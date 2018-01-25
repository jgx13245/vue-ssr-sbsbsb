var fs = require('fs')
var qr = require('qr-image')
const path = require('path')
const config = require('../config')
/*
 * qr.image(text,options)
 * options:
 *   type：生成二维码的类型，可以是png, svg, pdf and eps，默认png
 *   ec_level 默认为M，其他可设置：L, M, Q, H.
 *   size（只适用png和svg图）： png图默认为5，svg图默认为undefined
 *   margin：为二维码留白，只适用png图，默认为4，数字越小，留白越小
 *
 * */
exports.qrCodeImg =function (url,timestamp,outUrl,option) {
  option ? option : {type: 'png',size:6, ec_level: 'H',margin: 1}
  var qr_png = qr.image(url, option)
  outUrl = path.join(__dirname,outUrl)
  var imgName = outUrl + `${timestamp}.png`
  var qr_pipe = qr_png.pipe(fs.createWriteStream(imgName))
  qr_pipe.on('error', function(err){
    console.log(err)
    return
  })
  qr_pipe.on('finish', function(){
    return
  })
}
