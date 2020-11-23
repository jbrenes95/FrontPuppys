<template>
  <q-card class="my-card">
    <h3>VACUNAS</h3>

    <q-select
      rounded
      outlined
      option-value="id"
      option-label="name"
      v-model="selectVaccine"
      :options="vaccines"
      label="Ultima Vacuna"
    />

    <q-card-section>
      <q-input
        rounded
        outlined
        v-model="veterinary"
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
          type="submit"
          color="primary"
          v-on:click="updateDog"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import axios from "axios";
import moment from "moment";

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
      urlVaccines: "http://vps-b0e4feec.vps.ovh.net:8000/api/vaccines/",
      idDog: "",
      pero: "",
    };
  },
  created() {
    this.idDog = this.$store.state.IdDog;

    this.getLastVaccine().then(() => {
      axios.get(this.urlVaccines).then((e) => {
        const response = e.data;

        response.forEach((element) => {
          if (element.id > this.pero) {
            this.vaccines.push(element);
          }
        });
      });
    });

    this.selectVaccine = "";
  },
  methods: {
    updateDog: function() {
      this.prepareVaccine();

      /*axios
        .post("http://vps-b0e4feec.vps.ovh.net:8000/api/vaccine/", this.vaccine)
        .then((e) => {
          console.log(e);
          this.$router.push("/home");
        });*/
    },
    getLastVaccine: function() {
      return axios
        .get(
          "http://vps-b0e4feec.vps.ovh.net:8000/api/lastVaccine/" + this.idDog
        )
        .then((e) => {
          console.log(e.data[0]);
          this.pero = e.data[0].vaccines_id;
        });
    },
    createVaccine: function(vaccine) {
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
      this.$root.$emit("expiration", this.vaccine.expiration);
    },
  },
};
</script>
