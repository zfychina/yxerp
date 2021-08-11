import { createRouter, createWebHistory } from 'vue-router'
const Shortmold = () => import('@/views/shortmold/Shortmold')
const Bom = () => import('@/views/bom/Bom')
const Order = () => import('@/views/order/Order')
const Unsettled = () => import('@/views/unsettled/Unsettled')
const Profile = () => import('@/views/profile/Profile')
const Register = () => import('@/views/profile/Register')
const Login = () => import('@/views/profile/Login')

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Shortmold,
    meta: {
      title: '缺料',
      showNav: true,
    }
  },
  {
    path: '/shortmold',
    name: 'Shortmold',
    component: Shortmold,
    props: true,
    meta: {
      title: '缺料',
      showNav: true,
    }
  },
  {
    path: '/bom',
    name: 'Bom',
    component: Bom,
    meta: {
      title: 'BOM',
      isAuthRequired: true,
      showNav: true,
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: '订单',
      isAuthRequired: true,
      showNav: true,
    }
  },
  {
    path: '/unsettled',
    name: 'Unsettled',
    component: Unsettled,
    meta: {
      title: '未决',
      isAuthRequired: true,
      showNav: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人中心',
      isAuthRequired: true,
      showNav: true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '用户注册',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '用户登录',
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
