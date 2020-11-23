<template>
  <div class="row justify-center">
    <div class="col-7">
      <div class="q-pa-md" style="max-width: 350px">
        <showdog />
        <showvaccines />
      </div>
    </div>
    <div class="col-5">
      <q-btn
        label="Insertar Vacuna"
        type="submit"
        color="primary"
        v-on:click="showAddVaccine"
      />

      <createvaccine v-if="!addVaccine" />
      <calendar />
    </div>
    <q-fab color="primary" icon="keyboard_arrow_up" direction="up">
      <q-fab-action
        label-position="left"
        color="primary"
        @click="editDog"
        label="Editar"
      />
      <q-fab-action color="primary" @click="deleteDog" label="Borrar" />
    </q-fab>
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase";
import createvaccine from "../components/CreateVaccine";
import showdog from "../components/ShowDog";
import showvaccines from "../components/ShowVaccines";
import calendar from "../components/Calendar";
export default {
  components: {
    createvaccine,
    showdog,
    showvaccines,
    calendar,
  },
  data() {
    return {
      addVaccine: true,
      idDog: "",
      urlBaseDog: "http://vps-b0e4feec.vps.ovh.net:8000/api/dog/",
    };
  },
  methods: {
    showAddVaccine: function() {
      if (this.addVaccine) {
        this.addVaccine = false;
      } else {
        this.addVaccine = true;
      }
    },

    deleteDog: function() {
      axios.delete(this.urlBaseDog + this.idDog).then(() => {
        this.$root.$emit("refresh", firebase.auth().currentUser.uid);
        this.$router.push("/home");
      });
    },
    editDog: function() {
      this.$router.push("/edit");
    },
  },
  mounted() {
    this.$root.$on("update", (idDog) => {
      this.idDog = idDog;
    });
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
</style>
