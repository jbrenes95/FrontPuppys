import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UsersDog:{},
    IdDog:'',
    currentUser:''
  },
  mutations: {
    addDog(state,dog){
      state.UsersDog = dog;
    },
    loadId(state,uid){
      state.IdDog  = uid
    },
    saveUserLogin(state,user){
      state.currentUser = user
    }
    
  },
  actions: {
  },
  modules: {
  }
})
