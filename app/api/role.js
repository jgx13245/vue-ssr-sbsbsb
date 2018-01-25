const db = require('../model')
const responseCode = require('../util/response-code')
const logger = require('../util/logger')
const util = require('../util')

/**
 * 角色列表
 */
exports.list = (req, res) => {
  db.Role.findAll().then(result => {
    res.json({
      code: responseCode.SUCCESS,
      list: result
    })
  }).catch(err => {
    logger.app.error(err)
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

/**
 * 添加角色
 */
exports.add = (req, res) => {
  db.Role.create(req.body).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      message: '操作成功',
      role: result
    })
  }).catch(err => {
    logger.app.error(err)
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

/**
 * 编辑角色
 */
exports.edit = (req, res) => {
  db.Role.update(req.body, {
    where: {
      id: req.params.id
    }
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

/**
 * 删除角色
 */
exports.delete = (req, res) => {
  return db.Role.destroy({
    where: {
      id: req.params.id
    }
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

/**
 * 设置角色权限
 */
exports.permission = (req, res) => {
  return db.Role.update(req.body, {
    fields: ['permissions'],
    where: {
      id: req.params.id
    }
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
