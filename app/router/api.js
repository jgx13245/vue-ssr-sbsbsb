const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const uploadApi = require('../api/upload')
const userApi = require('../api/user')
const activityApi = require('../api/activity')
const roleApi = require('../api/role')
const permissionApi = require('../api/permission')
const bannerApi = require('../api/banner')
const dataApi = require('../api/data')
const channelApi = require('../api/channel')

/**
 * 公开接口，不需要登录就可以调用
 */
router.post('/public/user/login', userApi.login)
router.get('/public/activity/:key', activityApi.data)
router.get('/public/banner/myf/list', bannerApi.enableList) // 提供给美易分app进件的banner查询接口
router.post('/public/data/:id(\\d+)', dataApi.increment) // 数据统计接口

/**
 * 登录认证，后面的接口必须登录才能调用
 */
router.use(authMiddleware.isLogin)

// 上传接口
router.post('/upload/image', uploadApi.image)
router.get('/permission', permissionApi.list)

/**
 * 权限认证，后面的接口有对应的权限才能调用
 */
router.use(authMiddleware.hasPermission)

// 用户接口
router.get('/user', userApi.list)
router.post('/user', userApi.add)
router.put('/user/:id', userApi.edit)
router.delete('/user/:id', userApi.delete)

// 活动接口
router.get('/activity', activityApi.list)
router.get('/activity/:id', activityApi.detail)
router.post('/activity', activityApi.add)
router.put('/activity/:id', activityApi.edit)
router.delete('/activity/:id', activityApi.delete)
router.put('/activity/:id/status', activityApi.status)

// 角色接口
router.get('/role', roleApi.list)
router.post('/role', roleApi.add)
router.put('/role/:id', roleApi.edit)
router.put('/role/:id/permission', roleApi.permission)
router.delete('/role/:id', roleApi.delete)

// 数据统计列表接口
router.get('/data', dataApi.list)

// banner接口
router.get('/banner', bannerApi.list) // 查询banner列表
router.get('/banner/:id', bannerApi.detail) // banner详情
router.post('/banner', bannerApi.add) // 新增banner
router.put('/banner/:id', bannerApi.edit) // 更新banner
router.put('/banner/:current/:target', bannerApi.slideOrder) // 更新banner轮询顺序
router.delete('/banner/:id', bannerApi.delete) // 删除banner

// 渠道channel接口
router.get('/channel', channelApi.list)
router.post('/channel', channelApi.add)
router.put('/channel/:id', channelApi.edit)
router.delete('/channel/:id', channelApi.delete)

module.exports = router
