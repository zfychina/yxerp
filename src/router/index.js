import { createRouter, createWebHistory } from 'vue-router'
const Shortmold = () => import('@/views/shortmold/Shortmold')
const Shortmold_backup = () => import('@/views/shortmold/Shortmold_backup')
const Bom = () => import('@/views/bom/Bom')
const Order = () => import('@/views/order/Order')
const CreateOrder = () => import('@/views/order/CreateOrder')
const search = () => import('@/views/search/search')

const Unsettled = () => import('@/views/unsettled/Unsettled')
const createorderSC = () => import('@/views/unsettled/ChildComps/createorderSC')
const createorderSCRK = () => import('@/views/unsettled/ChildComps/createorderSCRK')
const createorderCG = () => import('@/views/unsettled/ChildComps/createorderCG')
const createorderCGRK = () => import('@/views/unsettled/ChildComps/createorderCGRK')

const Profile = () => import('@/views/profile/Profile')
const Register = () => import('@/views/profile/Register')
const Login = () => import('@/views/profile/Login')
const Statement = () => import('@/views/profile/ChildComps/Statement')
const customerStatement = () => import('@/views/profile/ChildComps/customerStatement')
const yearStatement = () => import('@/views/profile/ChildComps/yearStatement')
const yearcustomerStatement = () => import('@/views/profile/ChildComps/yearcustomerStatement')
const capacityStatement = () => import('@/views/profile/ChildComps/capacityStatement')


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
    path: '/Shortmoldbackup',
    name: 'Shortmoldbackup',
    component: Shortmold_backup,
    props: true,
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
    path: '/createorder',
    name: 'createorder',
    component: CreateOrder,
    meta: {
      title: '创建销售订单',
      isAuthRequired: true,
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: '搜索',
      isAuthRequired: true,
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
// 创建生产订单
  {
    path: '/createordersc',
    name: 'createordersc',
    component: createorderSC,
    meta: {
      title: '创建生产订单',
      isAuthRequired: true,
    }
  },
  {
    path: '/createorderscrk',
    name: 'createorderscrk',
    component: createorderSCRK,
    meta: {
      title: '创建生产入库单',
      isAuthRequired: true,
    }
  },
  {
    path: '/createordercg',
    name: 'createordercg',
    component: createorderCG,
    meta: {
      title: '创建采购订单',
      isAuthRequired: true,
    }
  },
  {
    path: '/createordercgrk',
    name: 'createordercgrk',
    component: createorderCGRK,
    meta: {
      title: '创建采购入库订单',
      isAuthRequired: true,
    }
  },

  {
    path: '/statement',
    name: 'Statement',
    component: Statement,
    meta: {
      title: '产品报表',
    }
  },
  {
    path: '/customerStatement',
    name: 'customerStatement',
    component: customerStatement,
    meta: {
      title: '客户报表',
    }
  },

  {
    path: '/yearstatement',
    name: 'yearStatement',
    component: yearStatement,
    meta: {
      title: '产品报表',
    }
  },
  {
    path: '/yearcustomerStatement',
    name: 'yearcustomerStatement',
    component: yearcustomerStatement,
    meta: {
      title: '客户报表',
    }
  },
  {
    path: '/capacitystatement',
    name: 'capacityStatement',
    component: capacityStatement,
    meta: {
      title: '产能报表',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
