<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    content-class="bg-grey-1"
  >
    <q-list>
      <q-item-label header class="text-grey-8 " style="text-align: center">
        Perros de Usuario
      </q-item-label>
      <q-expansion-item expand-separator label="Mascotas">
        <q-card>
          <q-card-section>
            <doglist
              clickable
              v-for="dog in dogs"
              :key="dog.id"
              :name="dog.name"
              :image="dog.image"
              @click.native="sendDog(dog.id)"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>
<script>
import axios from "axios";
import doglist from "./DogList";
import firebase from "firebase";
export default {
  name: "drawer",
  components: { doglist },
  data() {
    return {
      dogs: [],
      leftDrawerOpen: true,
      Iduser: "",
      apiUrlBase: "http://vps-b0e4feec.vps.ovh.net:8000/api/dog/",
    };
  },
  created() {
    this.getUserId();
    this.metodo(this.Iduser);
    this.$root.$on("refresh", (id) => {
      this.metodo(id);
    });
  },
  methods: {
    metodo: function(id) {
      this.dogs = [];
      axios.get(this.apiUrlBase + id).then((userDogs) => {
        this.showDogs(userDogs.data);
      });
    },
    showDogs: function(dogs) {
      dogs.forEach((dog) => {
        this.dogs.push({
          id: dog.id,
          name: dog.name,
          image: this.joinPhotoUrl(dog.photo),
        });
      });
    },
    joinPhotoUrl: function(photo) {
      const urlBasePhoto = "http://vps-b0e4feec.vps.ovh.net/Puppys";
      const finalPhoto = urlBasePhoto + photo;
      return finalPhoto;
    },
    sendDog: function(id) {
      this.$store.commit("loadId", id);
      this.$root.$emit("update", id);
    },
    getUserId() {
      this.Iduser = firebase.auth().currentUser.uid;
    },
  },
};
</script>
