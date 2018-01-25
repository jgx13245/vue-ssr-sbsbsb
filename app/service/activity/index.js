const redis = require('../../util/redis')

const hooks = [
  'beforeCreate',
  'afterCreate',
  'beforeUpdate',
  'afterUpdate',
  'beforeUpdateStatus',
  'afterUpdateStatus'
]

hooks.forEach(hook => {
  exports[hook] = (user, activity, oldActivity) => {
    const service = require(`./${user.role.type}`)
    if (service[hook]) {
      return service[hook](activity, oldActivity)
    }
    return activity
  }
})

/**
 * 创建活动缓存
 * @param activity
 * @returns {*}
 */
exports.createDataCache = activity => {
  const expire = new Date(activity.endTime).getTime() - Date.now()
  if (expire > 0) {
    return redis.psetexAsync(`activity:${activity.key}`, expire, JSON.stringify(activity))
  }
  return exports.deleteDataCache(activity)
}

/**
 * 获取活动缓存
 * @param activity
 * @returns {*}
 */
exports.getDataCache = key => {
  return redis.getAsync(`activity:${key}`).then(activity => {
    if (activity) {
      return JSON.parse(activity)
    }
    return null
  })
}

/**
 * 更新活动缓存
 * @param activity
 * @returns {*}
 */
exports.updateDataCache = activity => {
  return exports.createDataCache(activity)
}

/**
 * 删除活动缓存
 * @param activity
 * @returns {*}
 */
exports.deleteDataCache = activity => {
  return redis.delAsync(`activity:${activity.key}`)
}

