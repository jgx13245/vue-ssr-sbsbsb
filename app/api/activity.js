const db = require('../model')
const util = require('../util')
const responseCode = require('../util/response-code')
const logger = require('../util/logger')
const activityService = require('../service/activity')
const config = require('../config')
const moment = require('moment')

/**
 * 活动列表
 */
exports.list = (req, res) => {
  const page = req.query.page || 1
  const limit = Math.min(req.query.size, 15)
  const offset = (page - 1) * limit
  const where = {
    userId: req.user.id
  }
  if (req.query.keyword) {
    where.title = {
      $like: `%${req.query.keyword}%`
    }
  }
  if (req.query.beginDate) {
    where.beginTime = {
      $gte: req.query.beginDate
    }
  }
  if (req.query.endDate) {
    const endDate = moment(req.query.endDate).add(1, 'days').format('YYYY-MM-DD')
    where.endTime = {
      $lt: endDate
    }
  }
  db.Activity.findAndCount({
    where,
    limit,
    offset,
    order: [['id', 'desc']],
    include: {
      model: db.Data,
      attributes: ['id', 'channelId'],
      include: {
        model: db.Channel,
        attributes: ['id', 'name'],
      }
    }
  }).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      list: result.rows,
      total: result.count,
      webURL: config.webURL
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
 * 活动详情
 */
exports.detail = (req, res) => {
  db.Activity.isOwner(req.params.id, req.user.id).then(() => {
    return db.Activity.find({
      where: {
        id: req.params.id
      }
    })
  }).then(activity => {
    return activity.getData({
      where: {
        channelId: {
          $gt: 0
        }
      }
    }).then(data => {
      activity.setDataValue('data', data)
      return activity
    })
  }).then(activity => {
    res.json({
      code: responseCode.SUCCESS,
      message: '获取成功',
      activity
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
 * 添加活动
 */
exports.add = (req, res) => {
  Promise.resolve(req.body).then(activity => {
    activity.userId = req.user.id
    return activityService.beforeCreate(req.user, activity)
  }).then(activity => {
    return db.Activity.create(activity)
  }).then(activity => {
    activity.setDataValue('data', req.body.data)
    activity.setDataValue('appointStore', req.body.appointStore)
    return activityService.createDataCache(activity).then(() => {
      return activityService.afterCreate(req.user, activity.toJSON())
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: `创建成功`
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
 * 修改活动
 */
exports.edit = (req, res) => {
  const fields = ['title', 'key', 'beginTime', 'endTime', 'pageData']
  let oldActivity = null
  db.Activity.isOwner(req.params.id, req.user.id).then(data => {
    oldActivity = data
    return activityService.beforeUpdate(req.user, req.body, oldActivity)
  }).then(activity => {
    return db.Activity.update(activity, {
      where: {
        id: req.params.id
      },
      fields
    }).then(() => {
      fields.forEach(field => {
        activity[field] = req.body[field]
      })
      return activity
    })
  }).then(activity => {
    return activityService.updateDataCache(activity).then(() => {
      return activityService.afterUpdate(req.user, activity, oldActivity)
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: `修改成功`
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
 * 删除活动
 */
exports.delete = (req, res) => {
  db.Activity.isOwner(req.params.id, req.user.id).then(activity => {
    return activityService.deleteDataCache(activity).then(() => {
      return activity
    })
  }).then(activity => {
    return db.Activity.destroy({
      where: {
        id: activity.id
      }
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: '删除成功'
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
 * 活动JSON文件数据 (web调用)
 */
exports.data = (req, res) => {
  activityService.getDataCache(req.params.key).then(activity => {
    if (activity) {
      return Promise.resolve(activity)
    }
    return db.Activity.find({
      where: {
        key: req.params.key
      }
    }).then(activity => {
      if (activity) {
        return activity.getData({
          where: {
            channelId: {
              $gt: 0
            }
          }
        }).then(data => {
          data = data.map(item => item.channelId)
          activity.setDataValue('data', data)
          return activityService.createDataCache(activity)
        }).then(() => {
          return activity
        })
      }
      return Promise.reject(new Error('活动不存在'))
    })
  }).then(activity => {
    res.json({
      code: responseCode.SUCCESS,
      message: '获取成功',
      activity
    })
  }).catch(err => {
    logger.app.error(err.message)
    res.json({
      code: responseCode.ERROR,
      message: err.message
    })
  })
}

/**
 * 修改活动状态
 */
exports.status = (req, res) => {
  db.Activity.isOwner(req.params.id, req.user.id).then(activity => {
    activity.status = activity.status === 1 ? 2 : 1
    return db.Activity.update({
      status: activity.status
    }, {
      where: {
        id: req.params.id
      }
    }).then(() => {
      return activityService.updateDataCache(activity)
    }).then(() => {
      return activityService.afterUpdateStatus(req.user, activity)
    }).then(() => {
      return activity.status
    })
  }).then(status => {
    res.json({
      code: responseCode.SUCCESS,
      message: status === 1 ? '启用成功' : '禁用成功'
    })
  }).catch(err => {
    logger.app.error(err)
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

