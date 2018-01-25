const db = require('../model')
const responseCode = require('../util/response-code')
const logger = require('../util/logger')
const util = require('../util')
const moment = require('moment')

/**
 * banner列表
 * req内容：
 *   {page} 当前页码
 *   {size} 单页最大数
 *   {keyword} 名称关键字
 *   {beginDate} 对创建时间查询的开始时间
 *   {endDate} 对创建时间查询的结束时间
 * res内容：
 *   {code} response状态码
 *   {list} 符合检索条件的所有启用状态的banner
 *   {total} 符合检索条件的banner总数
 *   {activeCount} 启用状态的banner总数
 */
exports.list = (req, res) => {
  let activeCount = 0 // 启用状态的banner数
  const page = req.query.page || 1
  const limit = Math.min(req.query.size, 20)
  const offset = (page - 1) * limit
  const where = { // 默认检索条件
    userId: req.user.id
  }
  const whereActive = { // 启用状态检索条件
    userId: req.user.id,
    status: 1,
    endTime: {
      $gte: Date.now()
    }
  }
  const order = [['status', 'DESC'], ['slideOrder']] // 排序:启用状态在前，状态一致的banner按照slideOrder从小到大排序
  if (req.query.keyword) {
    whereActive.name = where.name = {
      $like: `%${req.query.keyword}%`
    }
  }
  if (req.query.beginDate && req.query.endDate) {
    whereActive.createdAt = where.createdAt = {
      $gt: req.query.beginDate,
      $lt: req.query.endDate
    }
  }
  // 获取活动状态的banner数量
  db.Banner.count({
    where: whereActive
  }).then(num => {
    activeCount = num
    // 排序查询所有banner
    return db.Banner.findAndCount({
      where,
      limit,
      offset,
      order
    })
  }).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      list: result.rows,
      total: result.count,
      activeCount: activeCount
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
 * banner详情
 */
exports.detail = (req, res) => {
  db.Banner.isOwner(req.params.id, req.user.id).then(() => {
    return db.Banner.findById(req.params.id)
  }).then(banner => {
    res.json({
      code: responseCode.SUCCESS,
      message: '获取Banner详情成功',
      banner
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
 * 添加banner
 */
exports.add = (req, res) => {
  // 查询当前DB中对应的用户名下，启用状态下的banner数量
  db.Banner.count({
    where: {
      userId: req.user.id,
      status: 1
    }
  }).then(num => {
    // 启用状态的banner最多存在10个
    if (num >= 10) {
      res.json({
        code: responseCode.ERROR,
        message: 'banner最多展示10个，请禁用或删除多余banner'
      })
    } else {
      req.body.userId = req.user.id // 将绑定的userid存入DB
      return db.Banner.create(req.body)
    }
  }).then(result => {
    // 更新slideOrder默认值为当前banner的id
    return db.Banner.update({slideOrder: result.id}, {
      where: {
        id: result.id
      }
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: 'Banner添加成功'
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
 * 编辑banner
 * 两种情况会调用edit：
 *   1. 状态修改
 *     req：
 *       {status} 要变成的状态
 *       {action} 为'statusChange'时表明是状态修改的请求
 *   2. 编辑banner（此时状态不会修改）
 *     req:
 *       {name} 图片名
 *       {url} 图片地址
 *       {linkAdd} 活动链接
 */
exports.edit = (req, res) => {
  // 状态修改并且是从禁用改为启用状态时：
  if (req.body.action === 'statusChange' && (req.body.status === 1 || req.body.status === '1')) { // 将status更新为启用状态时，需check当前DB中启用状态banner数量
    db.Banner.count({
      where: {
        userId: req.user.id,
        status: 1,
        endTime: {
          $gt: Date.now()
        }
      }
    }).then(num => {
      // 启用状态的banner最多存在10个
      if (num >= 10) {
        res.json({
          code: responseCode.ERROR,
          message: 'banner最多展示10个，请禁用或删除多余banner'
        })
      } else {
        return db.Banner.update(req.body, {
          where: {
            id: req.params.id
          }
        })
      }
    }).then(() => {
      res.json({
        code: responseCode.SUCCESS,
        message: 'Banner编辑成功'
      })
    }).catch(err => {
      logger.app.error(err)
      res.json({
        code: responseCode.ERROR,
        message: util.errorMessage(err)
      })
    })
  } else {
    // 两种场景：1. Banner编辑 2.状态修改并且是从启用改为禁用状态
    db.Banner.update(req.body, {
      where: {
        id: req.params.id
      },
      fields: req.body.action === 'statusChange' ? ['status'] : ['name', 'url', 'linkAdd', 'slideOrder', 'updatedAt', 'endTime']
    }).then(() => {
      res.json({
        code: responseCode.SUCCESS,
        message: 'Banner编辑成功'
      })
    }).catch(err => {
      logger.app.error(err)
      res.json({
        code: responseCode.ERROR,
        message: util.errorMessage(err)
      })
    })
  }
}

/**
 * 删除banner
 */
exports.delete = (req, res) => {
  db.Banner.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: 'Banner删除成功'
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
 * 设置banner顺序
 * 入参：
 *   {current} 当前轮播顺序值
 *   {target} 目标轮播顺序值
 * 操作：将当前和目标轮播顺序值交换
 */
exports.slideOrder = (req, res) => {
  let currentId // 当前banner的id
  let targetId // 目标banner的id
  // 以当前banner的slideOrder查询对应id并存储到currentId
  db.Banner.find({
    where: {
      slideOrder: req.params.current
    }
  }).then(item => {
    currentId = item.id
    // 以目标banner的slideOrder查询对应id并存储到targetId
    return db.Banner.find({
      where: {
        slideOrder: req.params.target
      }
    })
  }).then(item => {
    targetId = item.id
    // 先更新当前banner的轮播顺序
    return db.Banner.update({slideOrder: req.params.target}, {
      where: {
        id: currentId
      }
    })
  }).then(() => {
    // 再更新目标banner的轮播顺序
    return db.Banner.update({slideOrder: req.params.current}, {
      where: {
        id: targetId
      }
    })
  }).then(() => {
    res.json({
      code: responseCode.SUCCESS,
      message: '轮播顺序更新成功'
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
 * banner查询--提供给进件的接口
 */
exports.enableList = (req, res) => {
  const order = 'slideOrder' // 按照slideOrder从小到大排序
  const where = {
    status: 1, // 启用状态
    userId: 2 // 用户为美易分（查询由美易分创建的banner）
  }
  where.endTime = {
    $gte: Date.now()
  }
  db.Banner.findAll({
    where,
    order
  }).then((result) => {
    res.json({
      code: responseCode.SUCCESS,
      list: parseForMYF(result),
      message: '查询banner成功'
    })
  }).catch(err => {
    logger.app.error(err)
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

const parseForMYF = result => {
  let list = [],
    model = {
      subtitle: '', // 区分用标题，以是否为‘活动’来区分
      title: '', // 展示用标题
      content: '', // subtitle为【活动】时，content被用来作为活动的跳转链接；subtitle不为【活动】时，content无实际意义
      imgUrl: '', // 图片URL
      activeSub: 'null' // 活动标签，暂时存放null
    }
  for (let i = 0; i < result.length; i++) {
    model = {}
    // 用活动链接是否存在作为区分条件
    if (result[i].linkAdd) {
      // subtitle为【活动】时，content被用来作为活动的跳转链接
      model.subtitle = '活动'
      model.content = result[i].linkAdd
    } else {
      // subtitle不为【活动】时，content无实际意义，暂时存储banner的name
      model.subtitle = result[i].name === '活动' ? '活动Banner' : result[i].name // 避免存入的name就是【活动】
      model.content = result[i].name
    }
    model.title = result[i].name
    // 当前DB存储的url是包含图片宽高属性的字符串，所以需要转换一下
    const imgObj = result[i].url && JSON.parse(result[i].url)
    model.imgUrl = imgObj.path || ''
    model.activeSub = 'null'
    list.push(model)
  }
  return list
}
