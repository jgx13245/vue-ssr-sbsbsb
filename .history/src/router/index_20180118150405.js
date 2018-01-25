import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Pic = () => import('../views/pic.vue')
const Test = () => import('../views/test1.vue')
const Hello = () => import('../views')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/hello',
        name: 'Hello',
        component: d
      },
      {
        path: '/test1',
        name: ' Test',
        component: Test
      },
      {
        path: '/',
        name: ' pic',
        component: Pic
      },
      {
       path: '*', component: {template:"<h1>404<h1>"} 
      }
    ]
  })
}
