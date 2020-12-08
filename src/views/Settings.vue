<template>
  <div class="div-form" style="max-width: 300px">
    <q-chip class="q-mt-sm" color="primary" icon="bookmark">Tema</q-chip>
    <q-item-section>
      <q-select v-model="actualTheme" :options="themes" @input="changeTheme" />
    </q-item-section>
    <q-btn
      color="primary"
      class="q-mt-sm"
      @click="showChargeEmail"
      label="Cambiar Email"
    />
    <div v-if="!updateEmail">
      <q-input class="q-mt-sm" rounded outlined v-model="email" label="Email" />
      <q-btn
        color="primary"
        class="q-mt-sm"
        @click="update"
        label="Actualizar Email"
      />
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { changeTheme, themes } from "../themes/index";
import constants from "../constants";

export default {
  data() {
    return {
      updateEmail: true,
      email: "",
      user: firebase.auth().currentUser,
      themes: [],
      actualTheme: "",
      userId: "",
    };
  },
  mounted() {
    this.loadThemes();
    this.getIdUser();
  },
  methods: {
    showChargeEmail: function() {
      if (this.updateEmail) {
        this.updateEmail = false;
      } else {
        this.updateEmail = true;
      }
    },

    getIdUser() {
      this.userId = firebase.auth().currentUser.uid;
    },

    loadThemes() {
      this.themes = Object.keys(themes);
    },

    showChargePass: function() {
      if (this.updatePass) {
        this.updatePass = false;
      } else {
        this.updatePass = true;
      }
    },
    update: function() {
      if (this.user != null) {
        this.user
          .updateEmail(this.email)
          .then(() => {
            alert("Se ha cambiado correctamente");
            this.updateEmail = true;
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    changeTheme(theme) {
      changeTheme(theme);
      this.saveThemeCloud(theme);
    },

    saveThemeCloud(theme) {
      let db = firebase.firestore();

      db.collection("userThemes")
        .doc(this.userId)
        .set({
          theme: theme,
        })
        .catch(function(error) {
          alert(error);
        });
    },
  },
};
</script>
<style scoped>
.div-form {
  max-width: 30%;
  margin-left: 40%;
  border-radius: 5%;
}
</style>
