<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> Puppys </q-toolbar-title>
      <q-tabs class="rigth" shrink>
        <q-tab v-if="isLoggedIn"
          ><router-link to="/">Dashboard</router-link></q-tab
        >
        <q-tab v-if="isLoggedIn"
          ><router-link to="/create">Create Dog</router-link></q-tab
        >
        <q-tab v-if="!isLoggedIn"
          ><router-link to="/login">Login</router-link></q-tab
        >
        <q-tab v-if="!isLoggedIn"
          ><router-link to="/register">Register</router-link></q-tab
        >

        <q-tab v-if="isLoggedIn"
          ><router-link to="/edit">Edit</router-link></q-tab
        >
        <q-tab v-if="isLoggedIn" @click="logout">Logout</q-tab>
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
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
  },
};
</script>
