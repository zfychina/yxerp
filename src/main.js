import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Quasar, QTable, QTh, QTr, QTd } from 'quasar'

// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

document.onselectstart = function () { return false; }
createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(Quasar, {
    components: {
      QTable,
      QTh,
      QTr,
      QTd
    }
  })

// .use(ElementPlus)
.mount('#app')

