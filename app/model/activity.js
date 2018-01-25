const util = require('../util')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      comment: '活动标题',
      validate: {
        notEmpty: {
          msg: `活动标题不能为空`
        },
        len: util.validLength('活动标题', 3, 50)
      }
    },
    key: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      comment: '访问链接名称'
    },
    beginTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '活动开始时间',
      validate: {
        notEmpty: {
          msg: '活动开始时间不能为空'
        }
      },
      get () {
        const data = this.getDataValue('beginTime')
        if (!data) return
        return moment(data).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '活动结束时间',
      validate: {
        notEmpty: {
          msg: '活动结束时间不能为空'
        }
      },
      get () {
        const data = this.getDataValue('endTime')
        if (!data) return
        return moment(data).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    pageData: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '页面扩展数据',
      get () {
        const data = this.getDataValue('pageData')
        if (typeof data === 'string') {
          return JSON.parse(data)
        }
      },
      set (value) {
        this.setDataValue('pageData', JSON.stringify(value))
      }
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: 'url禁用标志',
      get () {
        const status = this.getDataValue('status')
        const endTime = new Date(this.getDataValue('endTime')).getTime()
        return Date.now() > endTime ? 3 : status
      }
    }
  })

  /**
   * 是否属于自己的活动
   * @param {number} id       活动id
   * @param {number} userId   用户id
   * @returns {Promise.<TResult>}
   */
  Activity.isOwner = function (id, userId) {
    return this.findById(id).then(result => {
      if (!result) {
        return Promise.reject(new Error('活动不存在'))
      }
      if (result.userId !== userId) {
        return Promise.reject(new Error('非法操作'))
      }
      return result.getData().then(data => {
        data = data.map(item => item.channelId).filter(item => item > 0)
        result.setDataValue('data', data)
        return Promise.resolve(result.toJSON())
      })
    })
  }

  /**
   * 模型关联
   * @param models
   */
  Activity.associate = function (models) {
    Activity.belongsTo(models.User)
    Activity.hasMany(models.Data)
  }

  return Activity
}
