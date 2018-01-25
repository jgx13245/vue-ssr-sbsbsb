const pathToRegexp = require('path-to-regexp')
const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

exports.list = () => {
  return [{
    title: '角色管理',
    route: 'role',
    actions: [{
      id: 1001,
      key: 'create',
      title: '创建角色',
      method: POST,
      path: '/role'
    }, {
      id: 1002,
      key: 'delete',
      title: '删除角色',
      method: DELETE,
      path: '/role/:id'
    }, {
      id: 1003,
      key: 'update',
      title: '编辑角色',
      method: PUT,
      path: '/role/:id'
    }, {
      id: 1004,
      key: 'get',
      title: '角色列表',
      method: GET,
      path: '/role'
    }, {
      id: 1005,
      key: 'updatePermission',
      title: '权限设置',
      method: PUT,
      path: '/role/:id/permission'
    }]
  }, {
    title: '用户管理',
    route: 'user',
    actions: [{
      id: 2001,
      key: 'create',
      title: '创建用户',
      method: POST,
      path: '/user'
    }, {
      id: 2002,
      key: 'delete',
      title: '删除用户',
      method: DELETE,
      path: '/user/:id'
    }, {
      id: 2003,
      key: 'update',
      title: '编辑用户',
      method: PUT,
      path: '/user/:id'
    }, {
      id: 2004,
      key: 'get',
      title: '用户列表',
      method: GET,
      path: '/user'
    }]
  }, {
    title: '活动管理',
    route: 'activityList',
    actions: [{
      id: 3001,
      key: 'create',
      title: '创建活动',
      method: POST,
      path: '/activity'
    }, {
      id: 3002,
      key: 'delete',
      title: '删除活动',
      method: DELETE,
      path: '/activity/:id'
    }, {
      id: 3003,
      key: 'update',
      title: '编辑活动',
      method: PUT,
      path: '/activity/:id'
    }, {
      id: 3004,
      key: 'get',
      title: '活动列表',
      method: GET,
      path: '/activity'
    }, {
      id: 3005,
      key: 'getDetail',
      title: '活动详情',
      method: GET,
      path: '/activity/:id'
    }, {
      id: 3006,
      key: 'updateStatus',
      title: '活动状态',
      method: PUT,
      path: '/activity/:id/status'
    }]
  }, {
    title: '数据统计',
    route: 'data',
    actions: [{
      id: 4001,
      key: 'get',
      title: '数据列表',
      method: GET,
      path: '/data'
    }]
  }, {
    title: 'banner管理',
    route: 'banner',
    actions: [{
      id: 5001,
      key: 'get',
      title: 'banner列表',
      method: GET,
      path: '/banner'
    }, {
      id: 5002,
      key: 'create',
      title: '添加banner',
      method: POST,
      path: '/banner'
    }, {
      id: 5003,
      key: 'update',
      title: '编辑banner',
      method: PUT,
      path: '/banner/:id'
    }, {
      id: 5004,
      key: 'delete',
      title: '删除banner',
      method: DELETE,
      path: '/banner/:id'
    }, {
      id: 5005,
      key: 'slideOrder',
      title: '编辑banner轮播顺序',
      method: PUT,
      path: '/banner/:current/:target'
    }, {
      id: 5006,
      key: 'getDetail',
      title: 'banner详情',
      method: GET,
      path: '/banner/:id'
    }]
  }, {
    title: '渠道管理',
    route: 'channel',
    actions: [{
      id: 6001,
      key: 'create',
      title: '创建渠道',
      method: POST,
      path: '/channel'
    }, {
      id: 6002,
      key: 'delete',
      title: '删除渠道',
      method: DELETE,
      path: '/channel/:id'
    }, {
      id: 6003,
      key: 'update',
      title: '编辑渠道',
      method: PUT,
      path: '/channel/:id'
    }, {
      id: 6004,
      key: 'get',
      title: '渠道列表',
      method: GET,
      path: '/channel'
    }]
  }]
}

/**
 * 操作权限表，提供给前端使用
 * @param role 角色对象
 */
exports.table = role => {
  return exports.list().filter(module => {
    return module.actions.map(action => role.permissions.includes(action.id)).includes(true)
  }).map(module => {
    if (module.route === 'activity') {
      module.route = role.type
    }
    const {title, route} = module
    const actions = {}
    module.actions.forEach(action => {
      actions[action.key] = role.permissions.includes(action.id)
    })
    return {title, route, actions}
  })
}

/**
 * 判断当前角色是否有权限
 * @param req  请求对象
 */
exports.has = req => {
  return exports.list().reduce((prev, current) => {
    return {actions: prev.actions.concat(current.actions)}
  }).actions.filter(action => {
    return req.user.role.permissions.includes(action.id)
  }).find(action => {
    const regexp = pathToRegexp(action.path)
    return req.method === action.method && regexp.test(req.path)
  })
}
