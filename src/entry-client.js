import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
const {app,router,store} = createApp()



//用服务器初始化的状态启动存储。 //状态是在SSR中确定的，并在页面标记中内联。服务器的数据预取后，同步到客户端
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 等到 router 将可能的异步组件和钩子函数解析完
router.onReady(() => {
  //添加路由器钩子用于处理异步。 
  //在初始路由结束后进行操作，这样我们就不会重复获取 
  //我们已有的数据。使用router.beforeresolve() 
  //异步组件被解析。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // 挂在Dom
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
