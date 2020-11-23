import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'
import axios from "axios";
import firebase from 'firebase';
import "./components/firebase";

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user=>{
if(!app){
 app = new Vue({
    router,
    store,
    axios,
    render: h => h(App)
  }).$mount('#app')
}
});


