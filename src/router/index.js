import Vue from "vue";
import VueRouter from "vue-router";

import dashboard from "../views/Dashboard.vue";
import create from "../views/Create.vue";
import login from "../views/Login.vue";
import register from "../views/Register.vue";
import home from "../components/HelloWorld.vue";
import edituser from "../views/Edituser.vue";
import firebase from "firebase";

Vue.use(VueRouter);
let router = new VueRouter({
 
  routes: [
    { path: '/', component: dashboard, meta: { requiresAuth: true } },
    { path: '/create', component: create, meta: { requiresAuth: true } },
    { path: '/home', component: home, meta: { requiresAuth: true } },
    { path: '/login', component: login, meta: { requiresGuest: true }},
    { path: '/register', component: register, meta: { requiresGuest: true } },
    { path: '/edit', component: edituser, meta: { requiresAuth: true } },
    
    

    {
      path: "/about",
      name: "About",

      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
  ]
});

/*router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(isAuthenticated && (to.path === '/login'|| to.path === '/register') ) {
    next({
      path:'/',
      query:{
        redirect: to.fullPath
      }
    })
  }
  if (requiresAuth && !isAuthenticated) {
    next({
      path:'/login',
      query:{
        redirect: to.fullPath
      }
    });
  } else {
    next();
  }
}) */


router.beforeEach((to,from,next)=>{
    
  if(to.matched.some(record=> record.meta.requiresAuth )){
    if(!firebase.auth().currentUser){

      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      next();
    }
  }else if(to.matched.some(record=> record.meta.requiresGuest)){
    if(firebase.auth().currentUser){

      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      next();
    }
  }else {
    next();
  }
});

export default router;
