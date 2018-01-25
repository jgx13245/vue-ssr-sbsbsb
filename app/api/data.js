/**
 * Created by Administrator on 2017/9/5.
 */
const db = require('../model')
const axios = require('axios')
const util = require('../util')
const config = require('../config')
const redis = require('../util/redis')
const schedule = require('node-schedule')
const logger = require('../util/logger')
const responseCode = require('../util/response-code')
const types = ['browse', 'share', 'button', 'reserve']
const qs = require('querystring')

// 统计方法 根据入参：活动id和类型在redis里增加hash或自增1
exports.increment = (req, res) => {
  const id = req.params.id
  const type = req.body.type
  const data = req.body.data
  const channel = req.body.channel || 0
  const key = `data:${id}-${channel}`
  if (!types.includes(type)) return res.json({code: responseCode.ERROR})
  if (type === 'browse' || type === 'share') _redisAdd(key, type, res, id, channel)
  if (type === 'button') {
    _redisAdd(key, 'button', res, id, channel)
    axios.post(`${config.saleURL}/doAddOrderClient`, qs.stringify(JSON.parse(data))).then(response => {
      if (response.data && response.data.code === 0) {
        _redisAdd(key, 'reserve', res, id, channel)
      }
      res.json(response.data)
    })
  }
}
// HSET key field value 将哈希表 key 中的域 field 的值设为 value 可以覆盖旧值; 为哈希表 key 中的域 field 的值加上增量 increment.
const _redisAdd = (key, type, res, id, channel) => {
  redis.hsetAsync(key, 'id', id).then(() => {
    return redis.hsetAsync(key, 'channel', channel)
  }).then(() => {
    redis.hincrbyAsync(key, type, 1)
  }).then(data => {
    console.info(`${id}-${channel}-${type}统计成功`)
  }).catch(err => {
    console.log(err)
  })
}

// 把redis同步到数据库
const update = () => {
  redis.keysAsync('data:*').then(keys => {
    return Promise.all(keys.map(key => redis.hgetallAsync(key)))
  }).then(list => {
    return list.map(item => {
      const promises = Object.keys(item).filter(key => !['id', 'channel'].includes(key)).map(key => {
        return db.sequelize.query(`UPDATE data SET ${key} = ${key} + ${item[key]} WHERE activityId = ${item.id} AND channelId = ${item.channel}`)
      })
      return Promise.all(promises).then(() => {
        return redis.hkeysAsync(`data:${item.id}-${item.channel}`)
      }).then(keys => {
        return keys.map(key => {
          return redis.hdelAsync(`data:${item.id}-${item.channel}`, key)
        })
      }).then(promises => {
        return Promise.all(promises)
      })
    })
  }).then(promises => {
    return Promise.all(promises)
  }).then(() => {
    logger.app.info('redis同步数据库完成')
  }).catch(err => {
    logger.app.error('同步失败', err)
  })
}

// 数据统计活动列表
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
    where.endTime = {
      $lte: req.query.endDate
    }
  }
  db.Activity.findAndCount({
    where,
    limit,
    offset,
    attributes: ['id', 'title', 'createdAt'],
    order: [['id', 'desc']],
    include: {
      model: db.Data,
      attributes: ['browse', 'share', 'button' , 'reserve', 'channelId'],
      include: {
        model: db.Channel,
        attributes: ['name'],
      }
    }
  }).then(result => {
    res.json({
      code: responseCode.SUCCESS,
      list: result.rows,
      total: result.count
    })
  }).catch(err => {
    logger.app.error(err)
    res.json({
      code: responseCode.ERROR,
      message: util.errorMessage(err)
    })
  })
}

// node-schedule 每小时执行一次
schedule.scheduleJob('0 0,30 * * * *', () => {
  update()
})
