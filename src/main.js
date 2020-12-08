import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'
import axios from "axios";
import firebase from 'firebase';
import "./apis/firebase";
import { changeTheme} from "./themes/index";

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(() =>{
  const user = firebase.auth().currentUser
  const db = firebase.firestore();
if(user != null){
  db.collection("userThemes").doc(user.uid).get().then(theme =>{
    changeTheme(theme.data().theme);
  });
}
changeTheme('default');
if(!app){
 app = new Vue({
    router,
    store,
    axios,
    render: h => h(App)
  }).$mount('#app')
}
});


