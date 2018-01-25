module.exports = {
  // 数据库配置
  mysql: {
    username: 'activities_w',
    password: 'NzYzMTc1OGQ4ZDg',
    database: 'activities',
    host: '10.152.10.5',
    dialect: 'mysql'
  },

  // redis 配置
  redis: {
    port: 6379,
    host: '10.143.92.178',
    password: 'NWU2YjgzOTRmZTM'
  },

  // server 地址
  serverURL: 'https://myfen.gomemyf.com/active',

  // web 地址
  webURL: 'https://myfen.gomemyf.com/active/web',

  // 上传接口地址
  uploadURL: 'http://10.143.92.200/fastdfs-gateway/myfen/upload/',

  // 销管接口地址
  saleURL: 'https://myfen.gomemyf.com/sm-api'
}
