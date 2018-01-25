import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
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
