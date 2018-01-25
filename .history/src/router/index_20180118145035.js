import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const ItemView = () => import('../views/pic.vue')
const UserView = () => import('../views/test1.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/hello',
        name: 'Hello',
        component: () => import('@/views/HelloWorld')
      },
      {
        path: '/test1',
        name: ' Test',
        component: () => import('@/views/test1')
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
