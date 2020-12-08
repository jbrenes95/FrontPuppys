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
    let user = firebase.auth().currentUser;

    this.$store.commit("saveUserLogin", user);
    if (user) {
      this.isLoggedIn = true;
    }
  },
};
</script>
<style lang="scss">
body,
.bg-custom,
.q-card {
  background: var(--q-color-background) !important;
}
.q-field__native + .q-field__label,
.q-field--focused .q-field__label,
.q-field__control-container > input::placeholder {
  color: var(--q-color-placeholder) !important;
}
span,
input,
textarea,
.q-item__label,
.q-field__input + div,
.q-toggle__label {
  color: var(--q-color-text) !important;
}
.q-drawer {
  color: var(--q-color-icons) !important;
}
.q-toolbar__title {
  color: var(--q-color-title);
}
.drawer-color {
  background: var(--q-color-drawer);
}
.q-menu {
  background: var(--q-color-drawer) !important;
}
</style>
