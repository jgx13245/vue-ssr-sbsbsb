import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = () => import ('../views/index/index.vue')
const Template = () => import ('../views/template/Home.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        name: 'index',
        component:Index,
      },
      {
        path: '/template',
        name: 'template',
        component:Template,
      }
    ]
  })
}
