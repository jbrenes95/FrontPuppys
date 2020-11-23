<template>
  <q-list bordered class="rounded-borders" style="max-width: 350px">
    <q-item-section v-for="dog in dsd" :key="dog.id">
      <q-item-label lines="1">Nombre</q-item-label>
      <q-item-label caption lines="2">{{ dog.name }}</q-item-label>
      <q-item-label lines="1">Veterinario</q-item-label>
      <q-item-label caption lines="2">{{ dog.veterinary }}</q-item-label>
      <q-item-label lines="1">Fecha de Vacunacion</q-item-label>
      <q-item-label caption lines="2">{{ dog.vaccination_date }}</q-item-label>
      <q-separator />
    </q-item-section>
  </q-list>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      vaccine: {
        Nombre: "",
        Veterinario: "",
        FechaVacunacion: "",
      },
      urlBaseVaccines: "http://vps-b0e4feec.vps.ovh.net:8000/api/vaccine/",
      idDog: "",
      dsd: [],
    };
  },
  mounted() {
    this.$root.$on("update", (idDog) => {
      this.idDog = idDog;
      axios.get(this.urlBaseVaccines + idDog).then((response) => {
        response.data.forEach((element) => {
          this.dsd.push(element);
        });
      });
      console.log(this.dsd);
    });
  },
  methods: {
    createVaccine: function(vaccine) {
      this.vaccine.Nombre = vaccine.name;
      this.vaccine.Veterinario = vaccine.veterinary;
      this.vaccine.FechaVacunacion = vaccine.vaccination_date;
    },
  },
};
</script>
