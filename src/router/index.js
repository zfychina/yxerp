import { createRouter, createWebHashHistory } from 'vue-router'
const Shortmold = () => import('@/views/shortmold/Shortmold')
const Bom = () => import('@/views/bom/Bom')
const Order = () => import('@/views/order/Order')
const CreateOrder = () => import('@/views/order/CreateOrder')
const search = () => import('@/views/search/search')

const Unsettled = () => import('@/views/unsettled/Unsettled')
const createorderSC = () => import('@/views/unsettled/ChildComps/createorderSC')
const createorderSCRK = () => import('@/views/unsettled/ChildComps/createorderSCRK')
const createorderSCRE = () => import('@/views/unsettled/ChildComps/createorderSCRE')
const createorderCG = () => import('@/views/unsettled/ChildComps/createorderCG')
const createorderXS = () => import('@/views/unsettled/ChildComps/createorderXS')
const createorderCGRK = () => import('@/views/unsettled/ChildComps/createorderCGRK')
const createorderCGRE = () => import('@/views/unsettled/ChildComps/createorderCGRE')
const createorderSCTL = () => import('@/views/order/createsctl')

const Profile = () => import('@/views/profile/Profile')
const Register = () => import('@/views/profile/Register')
const Login = () => import('@/views/profile/Login')
const setting = () => import('@/views/profile/ChildComps/setting')
const Statement = () => import('@/views/profile/ChildComps/Statement')
const customerStatement = () => import('@/views/profile/ChildComps/CustomerStatement')
const yearStatement = () => import('@/views/profile/ChildComps/yearStatement')
const yearcustomerStatement = () => import('@/views/profile/ChildComps/yearcustomerStatement')
const capacityStatement = () => import('@/views/profile/ChildComps/capacityStatement')
const SalesStatement = () => import('@/views/profile/ChildComps/SalesStatement')
const ProcessStatement = () => import('@/views/profile/ChildComps/ProcessStatement')
const CategoryGoodsDetail = () => import('@/views/profile/ChildComps/CategoryGoodsDetail')
const ProcessGoodsDetail = () => import('@/views/profile/ChildComps/ProcessGoodsDetail')


const routes = [
  {
    path: '/',
    name: 'Default',
    component: Shortmold,
    meta: {
      title: '缺料',
      showNav: true,
      keepAlive: true,
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
      keepAlive: true,
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
      keepAlive: true,
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
      keepAlive: true,
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
      keepAlive: true,
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
    path: '/createorderscre',
    name: 'createorderscre',
    component: createorderSCRE,
    meta: {
      title: '创建生产退料',
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
    path: '/createorderxs',
    name: 'createorderxs',
    component: createorderXS,
    meta: {
      title: '创建销售出货',
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
    path: '/createordercgre',
    name: 'createordercgre',
    component: createorderCGRE,
    meta: {
      title: '创建采购退货',
      isAuthRequired: true,
    }
  },

  {
    path: '/createordersctl',
    name: 'createordersctl',
    component: createorderSCTL,
    meta: {
      title: '创建采购入库订单',
      isAuthRequired: true,
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
    props: true,
    meta: {
      title: '个人设置',
    }
  },
  {
    path: '/capacitystatement',
    name: 'capacityStatement',
    component: capacityStatement,
    meta: {
      title: '产量统计',
      keepAlive: true,
    }
  },
  {
    path: '/categorygoodsdetail',
    name: 'categorygoodsdetail',
    component: CategoryGoodsDetail,
    meta: {
      title: '产品详情',
    }
  },
  {
    path: '/SalesStatement',
    name: 'SalesStatement',
    component: SalesStatement,
    meta: {
      title: '销售统计',
      keepAlive: true,
    }
  },
  {
    path: '/customerStatement',
    name: 'customerStatement',
    component: customerStatement,
    meta: {
      title: '客户报表',
      keepAlive: true,
    }
  },
  {
    path: '/processstatement',
    name: 'processStatement',
    component: ProcessStatement,
    meta: {
      title: '客户报表',
      keepAlive: true,
    }
  },
  {
    path: '/processgoodsdetail',
    name: 'processgoodsdetail',
    component: ProcessGoodsDetail,
    meta: {
      title: '产品详情',
    }
  },




  {
    path: '/statement',
    name: 'Statement',
    component: Statement,
    meta: {
      title: '产品统计',
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


]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
