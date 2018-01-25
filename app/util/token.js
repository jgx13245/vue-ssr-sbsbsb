const jwt = require('jsonwebtoken')

/**
 * 密钥
 * @type {string}
 */
const secret = 'gomemyf-active-config-system'

/**
 * token 编码
 * @param {number} userId 用户ID
 * @returns {*}
 */
exports.encode = userId => {
  return jwt.sign({
    userId
  }, secret, {
    expiresIn: '1h'
  })
}

/**
 * token 解码
 * @param {number} token
 * @returns {*}
 */
exports.decode = token => {
  return jwt.verify(token, secret)
}
