const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const moment = require('moment')

/**
 * sequelize 选项配置
 */
const options = {
  define: {
    underscoredAll: true,
    // paranoid: true,
    getterMethods: {
      createdAt () {
        const data = this.getDataValue('createdAt')
        if (data) {
          return moment(data).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updatedAt () {
        const data = this.getDataValue('updatedAt')
        if (data) {
          return moment(data).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      deletedAt () {
        const data = this.getDataValue('deletedAt')
        if (data) {
          return moment(data).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    }
  }
}

const sequelize = new Sequelize(Object.assign(options, config.mysql))

/**
 * 加载model
 */
const db = {}
fs.readdirSync(__dirname).filter(file => {
  return file.endsWith('js') && file !== 'index.js'
}).forEach(file => {
  const model = sequelize.import(path.join(__dirname, file))
  if (model && model.name) {
    const name = model.name.charAt(0).toUpperCase() + model.name.substring(1)
    db[name] = model
  }
})

/**
 * 模型关联
 */
Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
sequelize.sync()
module.exports = db
