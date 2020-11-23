<template>
  <div class="q-pa-md q-gutter-md">
    <q-avatar>
      <img :src="urlPhoto" ref="imagen" />
    </q-avatar>
    <q-list bordered class="rounded-borders" style="max-width: 350px">
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
        <q-item-label caption lines="2">{{
          this.showDog.Nacimiento
        }}</q-item-label>
        <q-item-label lines="1">Nacimiento</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Color }}</q-item-label>
        <q-item-label lines="1">Color</q-item-label>
        <q-item-label caption lines="2">{{ this.showDog.Genero }}</q-item-label>
        <q-item-label lines="1">Fecha en que se le puso el chip</q-item-label>
        <q-item-label caption lines="2">{{
          this.showDog.Colocacion
        }}</q-item-label>
        <q-item-label lines="1">Lugar donde esta el chip</q-item-label>
        <q-item-label caption lines="2">{{
          this.showDog.Localizacion
        }}</q-item-label>
      </q-item-section>
    </q-list>
  </div>
</template>

<script>
import axios from "axios";
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
      urlPhoto: "http://vps-b0e4feec.vps.ovh.net/Puppys",
      urlShowOneDog: "http://vps-b0e4feec.vps.ovh.net:8000/api/showDog/",
    };
  },
  mounted() {
    this.$root.$on("update", (idDog) => {
      this.idDog = idDog;
      axios.get(this.urlShowOneDog + idDog).then((response) => {
        this.joinPhotoUrl(response.data);
        this.createDog(response.data);

        this.$store.commit("addDog", response.data);
      });
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
