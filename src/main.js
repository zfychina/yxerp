import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

document.onselectstart = function () { return false; }
createApp(App)
  .use(store)
  .use(router)
  .use(Vant)

  .use(ElementPlus)
.mount('#app')

