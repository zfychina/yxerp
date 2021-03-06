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
const yearcaStatement = () => import('@/views/profile/ChildComps/yearcaStatement')
const customerStatement = () => import('@/views/profile/ChildComps/CustomerStatement')
const yearsaStatement = () => import('@/views/profile/ChildComps/yearsaStatement')
const yearcuStatement = () => import('@/views/profile/ChildComps/yearcuStatement')
const capacityStatement = () => import('@/views/profile/ChildComps/capacityStatement')
const SalesStatement = () => import('@/views/profile/ChildComps/SalesStatement')
const ProcessStatement = () => import('@/views/profile/ChildComps/ProcessStatement')
const CategoryGoodsDetail = () => import('@/views/profile/ChildComps/CategoryGoodsDetail')
const ProcessGoodsDetail = () => import('@/views/profile/ChildComps/ProcessGoodsDetail')
const yearGoodsDetail = () => import('@/views/profile/ChildComps/yearGoodsDetail')
const casaStatement = () => import('@/views/profile/ChildComps/casaStatement')
const EditItem = () => import('@/views/search/ChildComps/EditItem')

const routes = [
  {
    path: '/',
    name: 'Default',
    component: Shortmold,
    meta: {
      title: '??????',
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
      title: '??????',
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
      title: '??????',
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
      title: '??????',
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
      title: '????????????',
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
      title: '??????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: '??????',
      isAuthRequired: true,
    }
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '????????????',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '????????????',
    }
  },
// ??????????????????
  {
    path: '/createordersc',
    name: 'createordersc',
    component: createorderSC,
    meta: {
      title: '??????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/createorderscrk',
    name: 'createorderscrk',
    component: createorderSCRK,
    meta: {
      title: '?????????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/createorderscre',
    name: 'createorderscre',
    component: createorderSCRE,
    meta: {
      title: '??????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/createordercg',
    name: 'createordercg',
    component: createorderCG,
    meta: {
      title: '??????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/createorderxs',
    name: 'createorderxs',
    component: createorderXS,
    meta: {
      title: '??????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/createordercgrk',
    name: 'createordercgrk',
    component: createorderCGRK,
    meta: {
      title: '????????????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/createordercgre',
    name: 'createordercgre',
    component: createorderCGRE,
    meta: {
      title: '??????????????????',
      isAuthRequired: true,
    }
  },

  {
    path: '/createordersctl',
    name: 'createordersctl',
    component: createorderSCTL,
    meta: {
      title: '????????????????????????',
      isAuthRequired: true,
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
    props: true,
    meta: {
      title: '????????????',
    }
  },
  {
    path: '/capacitystatement',
    name: 'capacityStatement',
    component: capacityStatement,
    meta: {
      title: '????????????',
      keepAlive: true,
    }
  },
  {
    path: '/categorygoodsdetail',
    name: 'categorygoodsdetail',
    component: CategoryGoodsDetail,
    meta: {
      title: '????????????',
    }
  },
  {
    path: '/SalesStatement',
    name: 'SalesStatement',
    component: SalesStatement,
    meta: {
      title: '????????????',
      keepAlive: true,
    }
  },
  {
    path: '/customerStatement',
    name: 'customerStatement',
    component: customerStatement,
    meta: {
      title: '????????????',
      keepAlive: true,
    }
  },
  {
    path: '/processstatement',
    name: 'processStatement',
    component: ProcessStatement,
    meta: {
      title: '????????????',
      keepAlive: true,
    }
  },
  {
    path: '/processgoodsdetail',
    name: 'processgoodsdetail',
    component: ProcessGoodsDetail,
    meta: {
      title: '????????????'
    }
  },
  {
    path: '/yeargoodsdetail',
    name: 'yeargoodsdetail',
    component: yearGoodsDetail,
    meta: {
      title: '??????????????????'
    }
  },
  {
    path: '/casaStatement',
    name: 'casaStatement',
    component: casaStatement,
    meta: {
      title: '???????????????????????????'
    }
  },

  {
    path: '/yearcastatement',
    name: 'yearcastatement',
    component: yearcaStatement,
    meta: {
      title: '????????????????????????',
    }
  },

  {
    path: '/yearsaStatement',
    name: 'yearsaStatement',
    component: yearsaStatement,
    meta: {
      title: '????????????????????????',
    }
  },
  {
    path: '/yearcuStatement',
    name: 'yearcuStatement',
    component: yearcuStatement,
    meta: {
      title: '????????????????????????',
    }
  },

  // ????????????
  {
    path: '/edititem',
    name: 'edititem',
    component: EditItem,
    meta: {
      title: '??????',
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
