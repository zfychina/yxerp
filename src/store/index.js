import { createStore } from 'vuex'

const state = {
  user: {
    isLogin: window.localStorage.getItem('token') ? true : false
  },
}


const mutations = {
  setIsLogin(state, payload) {
    state.user.isLogin = payload;
  },
  // addCart(state, payload) {
  //   state.cartCount = payload.count
  // }
}


const getters = {

}

const actions = {
  // updateCart({commit}) {
  //   getCart().then(res=>{
  //     commit('addCart', {count:res.data.length || 0})
  //   })
  // }

}


const modules = {


}


export default createStore({
  state,
  mutations,
  actions,
  modules,
  getters,
})
