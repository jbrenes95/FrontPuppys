<template>
  <q-page class=" window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form ref="myForm" class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
                v-model="email"
                type="email"
                label="Email"
              />
              <q-input
                square
                filled
                clearable
                :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
                v-model="password"
                type="password"
                label="Password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              v-on:click="login"
              label="Login"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";
import constants from "../constants";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$refs.myForm.validate().then((success) => {
        success ? this.validateForm() : this.$q.notify(constants.alert);
      });
    },
    validateForm() {
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
    },
  },
};
</script>
