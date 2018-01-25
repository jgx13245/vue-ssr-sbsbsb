const db = require('../model')
const encodeToken = require('../util/token').encode
const responseCode = require('../util/response-code')
const logger = require('../util/logger')
const util = require('../util')
const permission = require('../util/permission')
const redis = require('../util/redis')

/**
 * 登录
 */
exports.login = (req, res) => {
  db.User.find({
    include: [db.Role],
    attributes: {
      exclude: ['password']
    },
    where: {
      username: req.body.username,
      password: util.md5(req.body.password)
    }
  }).then(user => {
    if (!user) {
      return Promise.reject(new Error('用户名或者密码错误'))
    }
    return redis.setexAsync(`user:${user.id}`, 3600, JSON.stringify(user)).then(() => {
      return user
    })
  }).then(user => {
    user.setDataValue('token', encodeToken(user.id))
    user.setDataValue('permissions', permission.table(user.role))
    res.json({
      code: responseCode.SUCCESS,
      message: '登录成功',
      user
    })
  }).catch(err => {
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

/**
 * 用户列表
 */
exports.list = (req, res) => {
  db.User.findAll({
    attributes: {
      exclude: ['password'],
    }
  }).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      message: '操作成功',
      list: result
    })
  }).catch(err => {
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

/**
 * 添加用户
 */
exports.add = (req, res) => {
  db.User.create(req.body).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      message: '操作成功',
      user: result
    })
  }).catch(err => {
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

/**
 * 修改用户
 */
exports.edit = (req, res) => {
  db.User.isAdmin(req.params.id).then(result => {
    if (result && req.body.username !== 'admin') {
      return Promise.reject(new Error('管理员用户名不能修改'))
    }
    return db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: '操作成功'
    })
  }).catch(err => {
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

/**
 * 删除用户
 */
exports.delete = (req, res) => {
  db.User.isAdmin(req.params.id).then(result => {
    if (result) {
      return Promise.reject(new Error('管理员账号不能删除'))
    }
    return db.User.destroy({
      where: {
        id: req.params.id
      }
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: '操作成功'
    })
  }).catch(err => {
    logger.app.error(err)
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}
