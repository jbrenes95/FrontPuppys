<template>
  <q-layout view="lHh Lpr lFf">
    <navbar />
    <drawer v-if="isLoggedIn" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import drawer from "./components/Drawer";
import navbar from "./components/Navbar";
import dashboard from "./views/Dashboard";

//import doglist from "./components/DogList";
import axios from "axios";
import firebase from "firebase";

export default {
  name: "LayoutDefault",

  components: {
    drawer,
    navbar,
    dashboard,
  },

  data() {
    return {
      leftDrawerOpen: false,
      isLoggedIn: false,
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style></style>
