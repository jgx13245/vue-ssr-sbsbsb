const permission = require('../util/permission')
const responseCode = require('../util/response-code')

/**
 * 获取所有权限
 */
exports.list = (req, res) => {
  res.json({
    code: responseCode.SUCCESS,
    message: '获取成功',
    list: permission.list()
  })
}
