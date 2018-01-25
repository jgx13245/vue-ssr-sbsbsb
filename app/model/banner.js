const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('banner', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      comment: '图片标题'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      comment: '图片地址'
    },
    linkAdd: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '链接地址'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: 'banner状态',
      get () {
        const status = this.getDataValue('status')
        const endTime = new Date(this.getDataValue('endTime')).getTime()
        return Date.now() > endTime ? -1 : status
      }
    },
    slideOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0:无顺序
      comment: 'banner轮播顺序'
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
    }
  }, {})

  /**
   * 是否属于自己创建的Banner
   * @param {number} id       Banner的id
   * @param {number} userId   用户id
   * @returns {Promise.<TResult>}
   */
  Banner.isOwner = function (id, userId) {
    return this.findById(id).then(result => {
      if (!result) {
        return Promise.reject(new Error('Banner不存在'))
      }
      if (result.userId !== userId) {
        return Promise.reject(new Error('非法操作'))
      }
      return Promise.resolve(result)
    })
  }

  /**
   * 模型关联
   * @param models
   */
  Banner.associate = function (models) {
    Banner.belongsTo(models.User)
  }

  return Banner
}
