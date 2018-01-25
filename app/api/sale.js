/**
 * 销管 server 相关接口
 * @file
 */
const axios = require('axios')
const config = require('../config')
const moment = require('moment')
const logger = require('../util/logger')

/**
 * 设置时间段、短信内容
 * @param activity 活动对象
 */
exports.addAppointDate = activity => {
  console.log(activity.appointStore)
  const reserve = activity.pageData.template.data.reserve
  const body = {
    activityId: activity.id,
    activityName: activity.title,
    activitySmsContent: reserve.sms,
    activityStatus: activity.status,
    userId: activity.userId,
    appointStore: JSON.stringify(activity.appointStore)
  }

  const appointDate = []
  reserve.dates.forEach(date => {
    const begin = moment(date.begin)
    const end = moment(date.end)
    const offset = end.diff(begin, 'days')
    appointDate.push(begin.format('YYYY-MM-DD'))
    for (let i = 0; i < offset; i++) {
      appointDate.push(begin.add(1, 'days').format('YYYY-MM-DD'))
    }
  })
  body.appointDate = appointDate.join(',')

  const appointTime = reserve.times.map(time => {
    return {
      startTime: time.begin,
      endTime: time.end,
      appointNum: time.num
    }
  })
  body.appointTime = JSON.stringify(appointTime)
  return axios.post(`${config.saleURL}/addAppointDate`, body).then(res => {
    if (res.data.code === 0) {
      return Promise.resolve(res.data)
    }
    logger.app.error(body, res.data)
    return Promise.reject(new Error('销管接口调用失败'))
  })
}

/**
 * 修改预约（活动）状态
 * @param activityId 活动ID
 * @param activityStatus 活动状态
 * @param userId 用户ID
 */
exports.updateAppointStatus = (activityId, activityStatus, userId) => {
  const body = {
    activityId,
    activityStatus,
    userId
  }
  return axios.post(`${config.saleURL}/updateAppointStatus`, body).then(res => {
    if (res.data.code === 0) {
      return Promise.resolve(res.data)
    }
    logger.app.error(body, res.data)
    return Promise.reject(new Error('销管接口调用失败'))
  })
}
