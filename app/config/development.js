module.exports = {
  // 数据库配置
  mysql: {
    username: 'liukai',
    password: 'liukai',
    database: 'activity',
    host: '10.143.117.36',
    dialect: 'mysql'
  },

  // redis 配置
  redis: {
    port: 6379,
    host: '10.143.44.13',
    password: '101434413'
  },

  // server 地址
  serverURL: 'http://localhost:3000',

  // web 地址
  webURL: 'http://localhost:3001',

  // 上传接口地址
  uploadURL: 'http://10.143.117.17:8888/fastdfs-gateway2.0/mer/upload/',

  // 销管接口地址
  saleURL: 'http://10.143.117.45:8081/sm-api'
}
