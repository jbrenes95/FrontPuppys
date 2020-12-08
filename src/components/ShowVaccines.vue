<template>
  <q-list bordered class="rounded-borders list">
    <q-item-section v-for="vaccine in vaccines" :key="vaccine.id">
      <q-item-label lines="1">Nombre</q-item-label>
      <q-item-label caption lines="2">{{ vaccine.name }}</q-item-label>
      <q-item-label lines="1">Veterinario</q-item-label>
      <q-item-label caption lines="2">{{ vaccine.veterinary }}</q-item-label>
      <q-item-label lines="1">Fecha de Vacunacion</q-item-label>
      <q-item-label caption lines="2">{{
        vaccine.vaccination_date
      }}</q-item-label>
      <q-separator />
    </q-item-section>
  </q-list>
</template>

<script>
import { axios } from "../apis/axios";
import constants from "../constants";
export default {
  data() {
    return {
      vaccine: {
        Nombre: "",
        Veterinario: "",
        FechaVacunacion: "",
      },
      urlBaseVaccines: constants.urlsApi.vaccine,
      vaccines: [],
    };
  },
  mounted() {
    this.$root.$on("update", (idDog) => {
      this.vaccines = [];
      axios
        .get(this.urlBaseVaccines + idDog)
        .then((dogVaccinations) => {
          dogVaccinations.data.forEach((vaccine) => {
            this.vaccines.push(vaccine);
          });
        })
        .catch((err) => alert(err.response.data.message));
    });
    this.$root.$on("clenaDog", () => {
      this.vaccines = [];
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
<style scoped>
.list {
  max-width: 39%;
  margin-left: 29%;
  border-radius: 5%;
}
</style>
