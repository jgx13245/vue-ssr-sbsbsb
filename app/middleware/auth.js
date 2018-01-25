const decodeToken = require('../util/token').decode
const responseCode = require('../util/response-code')
const permission = require('../util/permission')
const redis = require('../util/redis')

/**
 * 登录认证
 */
exports.isLogin = (req, res, next) => {
  const token = req.headers.authorization
  try {
    const payload = decodeToken(token)
    if (payload && payload.userId > 0) {
      return redis.getAsync(`user:${payload.userId}`).then(user => {
        if (user) {
          req.user = JSON.parse(user)
          req.user.isAdmin = req.user.role.type === 'admin'
          req.user.isMeiyifen = req.user.role.type === 'meiyifen'
          req.user.isMeijie = req.user.role.type === 'meijie'
          return next()
        }
        throw new Error('请重新登录')
      }).catch(err => {
        res.json({
          code: responseCode.UNAUTH,
          message: err.message
        })
      })
    }
  } catch (err) {
    let message = err.message
    switch (err.name) {
      case 'JsonWebTokenError':
        message = '请登录'
        break
      case 'TokenExpiredError':
        message = '授权已过期，请重新登录！'
        break
    }
    res.json({
      code: responseCode.UNAUTH,
      message
    })
  }
}

/**
 * 权限认证
 */
exports.hasPermission = (req, res, next) => {
  if (permission.has(req)) {
    return next()
  }
  res.json({
    code: responseCode.ERROR,
    message: '没有权限'
  })
}
