import Vue from 'vue'
import Router from 'vue-router'
import Pic from '@/views/pic'
Vue.use(Router)


export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/hello',
        name: 'Hello',
        component: () => import('@/components/HelloWorld')
      },
      {
        path: '/test1',
        name: ' Test',
        component: () => import('@/components/test1')
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
