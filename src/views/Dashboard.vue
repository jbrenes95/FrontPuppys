<template>
  <div class="row justify-center">
    <div class="col">
      <div class="q-pa-md">
        <showdog />
        <showvaccines />
        <q-fab
          v-if="!showButtons"
          color="primary"
          icon="keyboard_arrow_up"
          direction="up"
          class="fabuttons"
        >
          <q-fab-action
            label-position="left"
            color="primary"
            @click="editDog"
            label="Editar"
          />
          <q-fab-action color="primary" @click="deleteDog" label="Borrar" />
          <q-fab-action
            color="primary"
            @click="showAddVaccine"
            label="Añadir Vacuna"
          />
        </q-fab>
      </div>
    </div>
    <div class="col">
      <calendar />
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import showdog from "../components/ShowDog";
import showvaccines from "../components/ShowVaccines";
import calendar from "../components/Calendar";
import { axios } from "../apis/axios";
import constants from "../constants";
export default {
  components: {
    showdog,
    showvaccines,
    calendar,
  },
  data() {
    return {
      addVaccine: true,
      idDog: "",
      urlBaseDog: constants.urlsApi.dog,
      showButtons: true,
    };
  },
  methods: {
    showAddVaccine: function() {
      this.$router.push(constants.routes.editVaccines);
    },

    deleteDog: function() {
      axios
        .delete(this.urlBaseDog + this.idDog)
        .then(() => {
          this.$root.$emit("refresh", firebase.auth().currentUser.uid);
          this.$root.$emit("clenaDog", {});
        })
        .catch((err) => alert(err.response.data.message));
    },
    editDog: function() {
      this.$router.push(constants.routes.edit);
    },
  },
  mounted() {
    this.$root.$on("update", (idDog) => {
      this.idDog = idDog;
    });
    // oculta un boton
    this.$root.$on(
      "showbutton",
      (visibility) => (this.showButtons = visibility)
    );
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
.fabuttons {
  margin-left: 50%;
}
</style>
