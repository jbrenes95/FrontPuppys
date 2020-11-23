<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-input rounded outlined type="text" v-model="dog.name" />
    <q-input rounded outlined type="file" @change="loadImage" />
    <q-input rounded outlined type="text" v-model="dog.weight" />
    <q-input rounded outlined type="text" v-model="dog.size" />
    <q-input rounded outlined type="text" v-model="dog.race" />
    <q-input rounded outlined type="text" v-model="dog.color" />
    <q-input rounded outlined type="text" v-model="dog.location_chip" />
    <q-btn
      label="Actualizar"
      type="submit"
      color="primary"
      v-on:click="updateDog"
    />
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import firebase from "firebase";
export default {
  name: "edituser",
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
      urlBaseDog: "http://vps-b0e4feec.vps.ovh.net:8000/api/dog/",
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
    updateDog() {
      this.formatDate();
      console.log(this.dog);
      axios.put(this.urlBaseDog + this.dog.id, this.dog).then((e) => {
        this.$router.push("/home");
        this.$root.$emit("refresh", this.dog.user_id);
      });
    },
  },
};
</script>
