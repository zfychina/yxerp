import { createRouter, createWebHistory } from 'vue-router'
const Shortmold = () => import('@/views/shortmold/Shortmold')
const Bom = () => import('@/views/bom/Bom')
const Order = () => import('@/views/order/Order')
const Unsettled = () => import('@/views/unsettled/Unsettled')
const Profile = () => import('@/views/profile/Profile')

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Shortmold,
    meta: {
      title: '缺料'
    }
  },
  {
    path: '/shortmold',
    name: 'Shortmold',
    component: Shortmold,
    props: true,
    meta: {
      title: '缺料'
    }
  },
  {
    path: '/bom',
    name: 'Bom',
    component: Bom,
    meta: {
      title: '缺料'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: '订单'
    }
  },
  {
    path: '/unsettled',
    name: 'Unsettled',
    component: Unsettled,
    meta: {
      title: '未决'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人中心'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
