import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/first-page',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home/first-page',
        name: 'Page',
        component: () => import('@/views/BlogPage/FirstPage/index.vue'),
        meta: {
          activeMenu: '/home/first-page'
        }
      },
      {
        path: '/home/blog-control',
        name: 'BlogControl',
        component: () => import('@/views/BlogPage/BlogControl/index.vue'),
        meta: {
          activeMenu: '/home/blog-control'
        }
      },
      {
        path: '/home/user-control',
        name: 'BlogControl',
        component: () => import('@/views/BlogPage/UserControl/index.vue'),
        meta: {
          activeMenu: '/home/user-control'
        }
      },
      {
        path: '/home/type-control',
        name: 'BlogControl',
        component: () => import('@/views/BlogPage/TypeControl/index.vue'),
        meta: {
          activeMenu: '/home/type-control'
        }
      },
      {
        path: '/home/test-page',
        name: 'TestPage',
        component: () => import('@/views/BlogPage/TestPage/index.vue'),
        meta: {
          activeMenu: '/home/test-page'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
