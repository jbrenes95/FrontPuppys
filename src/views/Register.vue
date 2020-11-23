<template>
  <q-card-section>
    <q-input
      type="email"
      v-model="email"
      :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
      rounded
      outlined
      label="Email"
    />
    <q-input
      type="password"
      v-model="password"
      :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
      rounded
      outlined
      label="Contraseña"
    />

    <q-btn label="Register" @click="register" type="submit" color="primary" />
  </q-card-section>
</template>
<script>
import firebase from "firebase";
export default {
  name: "register",
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            alert(`Se ha creado el usuario correctamente`);
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
