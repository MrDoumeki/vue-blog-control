import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user.js'
// import permission from './modules/permission.js'
Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     user,
//     permission
//   },
//   getters
// })
export default new Vuex.Store({
  state: {
    token: '',
    user: '',
    admin: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    setAdmin (state, admin) {
      state.admin = admin
    }
  }
})
