<template>
  <q-card-section>
    <q-input type="email" rounded outlined v-model="email" label="email" />
    <q-input
      type="password"
      rounded
      outlined
      v-model="password"
      label="Contraseña"
    />

    <q-btn label="Login" v-on:click="login" type="submit" color="primary" />
  </q-card-section>
</template>
<script>
import firebase from "firebase";
export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.go({ path: this.$router.path });
          },
          (err) => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
  },
};
</script>
