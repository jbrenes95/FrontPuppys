<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> Puppys </q-toolbar-title>
      <q-tabs class="rigth" shrink>
        <q-tab v-if="!isLoggedIn"
          ><router-link to="/login" style="text-decoration: none"
            >Login</router-link
          ></q-tab
        >
        <q-tab v-if="!isLoggedIn"
          ><router-link to="/register" style="text-decoration: none"
            >Register</router-link
          ></q-tab
        >
        <q-tab v-if="isLoggedIn"
          ><router-link to="/editvaccines" style="text-decoration: none"
            >Edit</router-link
          ></q-tab
        >
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>
<script>
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created() {
    this.currentUser = firebase.auth().currentUser;
    if (this.currentUser) {
      this.isLoggedIn = true;
    }
  },
};
</script>
