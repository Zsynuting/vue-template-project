import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/pages/Login'
import Layout from '@/layout/Layout'

// modules
import NotFound from "@/pages/views/NotFound"

import Demo from '@/components/Demo'

const routes = [{
  path: '/',
  component: Login,
}, {
  path: '/login',
  component: Login
}, {
  path: '/demo',
  component: Demo
}, {
  path: "*",
  component: Layout,
  children: [{
    path: "*",
    component: NotFound
  }]
}];

const router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.fullPath.toLowerCase().indexOf('/login') > -1) {
//     next();
//   } else {
//     if (localStorage.getItem('access-token')) {
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   }
// })

export default router
