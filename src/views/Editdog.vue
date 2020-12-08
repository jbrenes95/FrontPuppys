<template>
  <q-form ref="myForm" class="q-gutter-md">
    <div class="div-form" style="max-width: 400px">
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        type="text"
        v-model="dog.name"
      />

      <q-input
        rounded
        outlined
        type="file"
        class="upload-file"
        @change="loadImage"
      />
      <button class="upload-button">Subir Imagen</button>
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        class="q-mt-md"
        rounded
        outlined
        type="text"
        v-model="dog.weight"
      />
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        type="text"
        v-model="dog.size"
      />
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        type="text"
        v-model="dog.race"
      />
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        type="text"
        v-model="dog.color"
      />
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        type="text"
        v-model="dog.location_chip"
      />
      <q-btn
        label="Actualizar"
        style="margin: 5% 0 5% 34%"
        type="submit"
        color="primary"
        v-on:click="updateDog"
      />
    </div>
  </q-form>
</template>
<script>
import { axios } from "../apis/axios";
import constants from "../constants";
import moment from "moment";
import firebase from "firebase";
export default {
  name: "editdog",
  data() {
    return {
      dog: {
        user_id: "",
        name: "",
        photo: "",
        weight: "",
        size: "",
        race: "",
        color: "",
        location_chip: "",
      },
      urlBaseDog: constants.urlsApi.dog,
    };
  },
  created() {
    this.getIduser();
    this.dogToUpdate();
  },
  methods: {
    dogToUpdate() {
      this.dog = this.$store.state.UsersDog;
    },
    getIduser() {
      this.dog.user_id = firebase.auth().currentUser.uid;
    },
    loadImage(e) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e) => {
        this.dog.photo = e.target.result;
      };
    },
    formatDate() {
      this.dog.birth = moment(this.birthDate).format("YYYY-MM-DD");
      this.dog.chip_date = moment(this.chipDate).format("YYYY-MM-DD");
    },
    updateDogApi() {
      this.formatDate();
      this.$router.push(constants.routes.dashboard);
      axios
        .put(this.urlBaseDog + this.dog.id, this.dog)
        .then(() => {
          this.$root.$emit("refresh", this.dog.user_id);
        })
        .catch((err) => alert(err.response.data.message));
    },
    updateDog() {
      this.$refs.myForm.validate().then((success) => {
        success ? this.updateDogApi() : this.$q.notify(constants.alert);
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

.upload-file {
  opacity: 0;
  position: absolute;
}
.upload-button {
  border-radius: 5%;
  border: none;
  color: "primary";
  width: 268px;
  height: 50px;
  background: var(--q-color-primary) !important;
}
</style>
