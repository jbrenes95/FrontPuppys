import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UsersDog:{},
    IdDog:'',
  },
  mutations: {
    addDog(state,dog){
      state.UsersDog = dog;

    },
    loadId(state,uid){
      state.IdDog  = uid
    },
    
  },
  actions: {
  },
  modules: {
  }
})
