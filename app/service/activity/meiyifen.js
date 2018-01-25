const moment = require('moment')
const saleApi = require('../../api/sale')
const db = require('../../model')

/**
 * 是否有美易分预约数据
 * @param pageData
 * @returns {string|boolean}
 */
const hasReserveData = pageData => {
  return ['reserveButton', 'reserveForm'].includes(pageData.template.type) && pageData.template.data.reserve
}

/**
 * 创建前和更新前公共操作
 * @param activity
 */
const beforeCreateAndUpdate = activity => {
  if (hasReserveData(activity.pageData)) {
    // 预约数据日期格式转换
    activity.pageData.template.data.reserve.dates.forEach(item => {
      item.begin = moment(item.begin).format('YYYY-MM-DD')
      item.end = moment(item.end).format('YYYY-MM-DD')
    })
    // 预约数据时间格式转换
    activity.pageData.template.data.reserve.times.forEach(item => {
      item.begin = moment(item.begin).format('HH:mm:ss')
      item.end = moment(item.end).format('HH:mm:ss')
    })
  }
  if (activity.pageData.channel) {
    activity.pageData.channel = activity.pageData.channel.sort()
  }
}

/**
 * 创建后和更新后公共操作
 * @param activity
 */
const afterCreateAndUpdate = activity => {
  if (hasReserveData(activity.pageData)) {
    return saleApi.addAppointDate(activity)
  }
  return Promise.resolve()
}

/**
 * 创建前
 */
exports.beforeCreate = activity => {
  beforeCreateAndUpdate(activity)
  return activity
}

/**
 * 创建后
 */
exports.afterCreate = activity => {
  return afterCreateAndUpdate(activity).then(() => {
    const list = [{
      activityId: activity.id,
      channelId: 0
    }]
    activity.data.forEach(channelId => {
      list.push({
        activityId: activity.id,
        channelId: channelId
      })
    })
    return db.Data.bulkCreate(list)
  }).then(() => {
    return activity
  })
}

/**
 * 更新前
 */
exports.beforeUpdate = activity => {
  beforeCreateAndUpdate(activity)
  return activity
}

/**
 * 更新后
 */
exports.afterUpdate = (activity, oldActivity) => {
  return afterCreateAndUpdate(activity).then(() => {
    const newChannel = activity.data
    const oldChannel = oldActivity.data
    const addChannel = []
    const delChannel = []
    const promiseList = []

    newChannel.forEach(item => {
      if (!oldChannel.includes(item)) {
        addChannel.push(item)
      }
    })

    oldChannel.forEach(item => {
      if (!newChannel.includes(item)) {
        delChannel.push(item)
      }
    })

    if (addChannel.length) {
      const list = []
      addChannel.forEach(channelId => {
        list.push({
          activityId: activity.id,
          channelId: channelId
        })
      })
      promiseList.push(db.Data.bulkCreate(list))
    }

    if (delChannel.length) {
      promiseList.push(
        db.Data.destroy({
          where: {
            activityId: activity.id,
            channelId: {
              $in: delChannel
            }
          }
        })
      )
    }
    console.log(addChannel, delChannel)
    return Promise.all(promiseList).then(() => {
      return activity
    })
  })
}

/**
 * 更新状态后
 */
exports.afterUpdateStatus = ({id, status, userId}) => {
  return saleApi.updateAppointStatus(id, status, userId)
}
