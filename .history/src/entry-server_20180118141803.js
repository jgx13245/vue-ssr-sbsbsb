import { createApp } from './main'
import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(Vuex)
//不能直接使用axios,需要带前缀
Vue.use(VueAxios, axios)
Vue.use(axios)
//import App from './components/pic.vue'
import store from './store/store.all'
//import {PIC} from './store/mutation-types'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
     const { app, router,store } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents()
          // 匹配不到的路由，执行 reject 函数，并返回 404
          if (!matchedComponents.length) {
            // eslint-disable-next-line
            return reject({ code: 404 })
          }
          // Promise 应该 resolve 应用程序实例，以便它可以渲染
          Promise.all(matchedComponents.map(Component => {
            if (Component.asyncData) {
              return Component.asyncData({
                store,
                route: router.currentRoute
              })
            }
          })).then(() => {
            // 在所有预取钩子(preFetch hook) resolve 后，
            // 我们的 store 现在已经填充入渲染应用程序所需的状态。
            // 当我们将状态附加到上下文，
            // 并且 `template` 选项用于 renderer 时，
            // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
            context.state = store.state
            resolve(app)
          }).catch(reject)
        }, reject)
    /*
        }, reject)

        Vue.axios.get('http://localhost:8090/data').then((response) => {
            // 获取数据
            const pic = response.data.data.liveWodList
            //console.log(pic);
            // 把数据存到Vuex里面
            //store.commit(PIC.GET_DATA, pic)
          console.log(pic);
            Vue.$store.dispatch('getData', pic);
            // 把state存放到context中
            context.state = store.state;
            resolve(app)
        })*/
  })
}
