const db = require('../model')
const responseCode = require('../util/response-code')
const logger = require('../util/logger')
const redis = require('../util/redis')
const util = require('../util')

/**
 * 渠道列表
 */
exports.list = (req, res) => {
  const where = {
    userId: req.user.id
  }
  db.Channel.findAll({
    where
  }).then(result => {
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
 * 添加渠道
 */
exports.add = (req, res) => {
  req.body.userId = req.user.id
  db.Channel.create(req.body).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      message: '操作成功',
      channel: result
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
 * 编辑渠道
 */
exports.edit = (req, res) => {
  req.body.userId = req.user.id
  db.Channel.update(req.body, {
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
 * 删除渠道
 */
exports.delete = (req, res) => {
  return db.Channel.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    return db.Data.destroy({
      where: {
        channelId: req.params.id
      }
    })
  }).then(() => {
    // 删除渠道时，删除 redis 里所有此渠道的活动数据
    return redis.keysAsync(`data:*-${req.params.id}`).then(keys => {
      return keys.map(key => {
        return redis.hkeysAsync(key).then(hkeys => {
          return hkeys.map(hkey => {
            return redis.hdelAsync(key, hkey)
          })
        })
      })
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
