const devConfig = require('./development')

module.exports = Object.assign({}, devConfig, {
  // server 地址
  serverURL: 'https://static-sit.gomemyf.com/active',

  // web 地址
  webURL: 'https://static-sit.gomemyf.com/active/web'
})
