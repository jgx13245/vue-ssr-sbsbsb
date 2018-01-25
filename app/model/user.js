const util = require('../util')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '自增ID'
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      defaultValue: '',
      comment: '用户名',
      validate: {
        notEmpty: {
          msg: '用户名不能为空'
        },
        len: util.validLength('用户名', 3, 30)
      }
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '密码',
      set (val) {
        this.setDataValue('password', util.md5(val))
      },
      validate: {
        notEmpty: {
          msg: '请输入密码'
        }
      }
    },
    nickname: {
      type: DataTypes.STRING(20),
      comment: '昵称',
      validate: {
        len: util.validLength('昵称', 2, 20)
      }
    },
    mobile: {
      type: DataTypes.STRING(11),
      comment: '手机号码',
      validate: {
        is: {
          args: /^1\d{10}$/,
          msg: '手机号码格式错误'
        }
      }
    }
  })

  /**
   * 根据用户名查询用户
   * @param username
   * @returns {Promise.<Model>}
   */
  User.findByUsername = function (username) {
    return this.findOne({
      where: {
        username
      }
    })
  }

  /**
   * 模型关联
   * @param models
   */
  User.associate = function (models) {
    // 用户属于一个角色
    User.belongsTo(models.Role)
    User.hasMany(models.Activity)
    User.hasMany(models.Channel)

  }

  /**
   * 是否为管理员
   * @param id
   */
  User.isAdmin = function (id) {
    return this.findOne({
      where: {
        id
      }
    }).then(result => {
      return Promise.resolve(result.username === 'admin')
    })
  }

  return User
}
