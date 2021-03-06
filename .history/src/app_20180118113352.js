import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import VueAxios from 'vue-axios'
import axios from 'axios'
import api from './assets/api';
import store from './store/index'
import titleMixin from './util/title'
import * as filters from './util/filters'
Vue.prototype.api = api;
Vue.use(VueAxios,axios)
Vue.use(Vuex)

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//暴露一个工厂函数，它创建了一个新的存储，路由器， 每个调用上的应用实例(每个SSR请求都被调用)
export function createApp () {
  // 创造route和store的实例
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
