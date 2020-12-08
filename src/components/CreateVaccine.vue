<template>
  <q-form class="div-form" ref="myForm">
    <q-card-section class="card-vaccines">
      <q-select
        rounded
        outlined
        class="q-pb-md"
        option-value="id"
        option-label="name"
        v-model="selectVaccine"
        :options="vaccines"
        label="Ultima Vacuna"
      />

      <q-input
        rounded
        outlined
        class="q-pb-md"
        v-model="veterinary"
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        label="Veterinario de la vacuna"
      />

      <q-input
        rounded
        outlined
        v-model="vaccine.vaccination_date"
        mask="date"
        label="Fecha de la vacuna"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="vaccine.vaccination_date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div>
        <q-btn
          label="Actualizar"
          style="margin: 5% 0 5% 40%"
          color="primary"
          v-on:click="updateDog"
        />
      </div>
    </q-card-section>
  </q-form>
</template>
<script>
import { axios } from "../apis/axios";
import moment from "moment";
import constants from "../constants";

export default {
  data() {
    return {
      vaccine: {
        vaccines_id: "",
        dog_id: "",
        name: "",
        veterinary: "",
        vaccination_date: "",
        expiration: "",
      },
      veterinary: "",
      vaccines: [],
      selectVaccine: {},
      urlVaccines: constants.urlsApi.vaccines,
      urlLastVaccine: constants.urlsApi.lastVaccine,
      urlVaccine: constants.urlsApi.vaccine,
      idDog: "",
      lastVaccineId: "",
    };
  },
  created() {
    this.idDog = this.$store.state.IdDog;
    /*me traigo todas las vacunas y la id de la ultima vacuna asi creo el select dinamico con las 
        con las vacunas que le faltan a cada perro*/
    this.getLastVaccine().then(() => {
      axios.get(this.urlVaccines).then((vaccines) => {
        this.fillSelect(vaccines.data);
      });
    });
    this.selectVaccine = "";
  },
  methods: {
    fillSelect(allVaccines) {
      allVaccines.forEach((vaccine) => {
        if (vaccine.id > this.lastVaccineId) {
          this.vaccines.push(vaccine);
        }
      });
    },
    updateDog: function() {
      this.$refs.myForm.validate().then((success) => {
        success ? this.saveupdateDog() : this.$q.notify(constants.alert);
      });
    },
    saveupdateDog() {
      this.prepareVaccine();
      axios
        .post(this.urlVaccine, this.vaccine)
        .then(() => {
          const hide = true;
          this.$root.$emit("expiration", this.vaccine.expiration);
          this.$root.$emit("update", this.$store.state.IdDog);
          this.$router.push(constants.routes.dashboard);
        })
        .catch((err) => alert(err.response.data.message));
    },
    getLastVaccine() {
      return axios
        .get(this.urlLastVaccine + this.idDog)
        .then((lastVaccine) => {
          this.lastVaccineId = lastVaccine.data[0].vaccines_id;
        })
        .catch((err) => alert(err.response.data.message));
    },
    createVaccine(vaccine) {
      this.vaccine.Nombre = vaccine.name;
      this.vaccine.Veterinario = vaccine.veterinary;
      this.vaccine.FechaVacunacion = vaccine.vaccination_date;
    },
    prepareVaccine() {
      this.vaccine.dog_id = this.idDog;
      this.vaccine.vaccines_id = this.selectVaccine.id;
      this.vaccine.name = this.selectVaccine.name;
      this.vaccine.veterinary = this.veterinary;
      this.vaccine.expiration = moment(this.vaccine.vaccination_date)
        .add(this.selectVaccine.days, "days")
        .format("YYYY-MM-DD");
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
.card-vaccines {
  border-radius: 5%;
}
</style>
