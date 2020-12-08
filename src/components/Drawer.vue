<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    :width="200"
    :breakpoint="500"
    bordered
    content-class="bg-grey-3"
  >
    <q-list>
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
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>

        <q-item-section>
          <router-link style="text-decoration: none" to="/"
            >Dashboard</router-link
          >
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="send" />
        </q-item-section>

        <q-item-section>
          <router-link style="text-decoration: none" to="/create"
            >Nuevo Perro</router-link
          >
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="icon" name="settings" />
        </q-item-section>

        <q-item-section>
          <router-link style="text-decoration: none" to="/settings"
            >Ajustes</router-link
          >
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="error" />
        </q-item-section>

        <q-item-section @click="logout">
          Logout
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
<script>
import { axios } from "../apis/axios";
import doglist from "./DogList";
import firebase from "firebase";
import constants from "../constants";
export default {
  name: "drawer",
  components: { doglist },
  data() {
    return {
      drawer: false,
      miniState: true,
      dogs: [],
      leftDrawerOpen: true,
      Iduser: "",
      apiUrlBase: constants.urlsApi.dog,
    };
  },
  created() {
    this.getUserId();
    this.getDogUser(this.Iduser);
    this.$root.$on("refresh", (id) => {
      this.getDogUser(id);
    });
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
    getDogUser: function(id) {
      this.dogs = [];
      axios
        .get(this.apiUrlBase + id)
        .then((userDogs) => {
          this.showDogs(userDogs.data);
        })
        .catch((err) => alert(err.response.data.message));
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
      const urlBasePhoto = constants.urlPhoto;
      const finalPhoto = urlBasePhoto + photo;
      return finalPhoto;
    },
    sendDog: function(id) {
      this.$store.commit("loadId", id);
      this.$root.$emit("update", id);
      this.$root.$emit("showbutton", false);
    },
    getUserId() {
      this.Iduser = firebase.auth().currentUser.uid;
    },
  },
};
</script>
