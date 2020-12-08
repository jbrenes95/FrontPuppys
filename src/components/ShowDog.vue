<template>
  <div class="q-pa-md q-gutter-md">
    <q-avatar class="photo" size="100px">
      <img :src="urlPhoto" ref="imagen" />
    </q-avatar>
    <q-list bordered class="list">
      <q-item-section>
        <q-item-label lines="1">Nombre</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Nombre }}</q-item-label>
        <q-item-label lines="1">Peso</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Peso }}</q-item-label>
        <q-item-label lines="1">Tamaño</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Tamaño }}</q-item-label>
        <q-item-label lines="1">Raza</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Raze }}</q-item-label>
        <q-item-label lines="1">Genero</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Genero }}</q-item-label>
        <q-item-label lines="1">Nacimiento</q-item-label>
        <q-item-label caption lines="2">{{
          this.showDog.Nacimiento
        }}</q-item-label>
        <q-item-label lines="1">Color</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Color }}</q-item-label>
        <q-item-label lines="1">Fecha de colocacion del chip</q-item-label>
        <q-item-label caption lines="2">{{
          this.showDog.Colocacion
        }}</q-item-label>
        <q-item-label lines="1">Ubicacion del chip</q-item-label>
        <q-item-label caption lines="2">{{
          this.showDog.Localizacion
        }}</q-item-label>
      </q-item-section>
    </q-list>
  </div>
</template>
<script>
import { axios } from "../apis/axios";
import constants from "../constants";
export default {
  data() {
    return {
      showDog: {
        Nombre: "",
        Peso: "",
        Tamaño: "",
        Raze: "",
        Genero: "",
        Tamaño: "",
        Nacimiento: "",
        Color: "",
        Colocacion: "",
        Localizacion: "",
      },
      urlPhoto: constants.urlPhoto,
      urlShowOneDog: constants.urlsApi.showDog,
    };
  },
  mounted() {
    this.$root.$on("update", (idDog) => {
      axios
        .get(this.urlShowOneDog + idDog)
        .then((dog) => {
          this.joinPhotoUrl(dog.data);
          this.createDog(dog.data);
          this.$store.commit("addDog", dog.data);
        })
        .catch((err) => alert(err.response.data.message));
    });
    this.$root.$on("clenaDog", () => {
      this.showDog = {};
      this.urlPhoto = this.urlPhoto.slice(0, 38);
    });
  },
  methods: {
    joinPhotoUrl: function(dog) {
      this.urlPhoto = this.urlPhoto.slice(0, 38);
      this.urlPhoto = this.urlPhoto + dog.photo;
    },
    createDog: function(dog) {
      this.showDog.Nombre = dog.name;
      this.showDog.Peso = dog.weight;
      this.showDog.Tamaño = dog.size;
      this.showDog.Raze = dog.race;
      this.showDog.Nacimiento = dog.birth;
      this.showDog.Color = dog.color;
      this.showDog.Genero = dog.sex;
      this.showDog.Colocacion = dog.chip_date;
      this.showDog.Localizacion = dog.location_chip;
    },
  },
};
</script>
<style scoped>
.list {
  max-width: 40%;
  margin-left: 30%;
  border-radius: 5%;
}
.photo {
  margin-left: 0%;
}
</style>
