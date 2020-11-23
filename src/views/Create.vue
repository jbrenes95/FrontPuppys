<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-input
        rounded
        outlined
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        v-model="dog.name"
        label="Tu nombre"
      />
      <q-input rounded outlined type="file" @change="loadImage" />

      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        type="number"
        v-model="dog.weight"
        label="Peso"
      />
      <q-input
        rounded
        outlined
        v-model="dog.size"
        label="tamaño
        "
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
      />
      <q-input rounded outlined v-model="dog.race" label="Raza" />

      <q-select
        rounded
        outlined
        v-model="dog.sex"
        :options="options"
        label="Genero"
      />

      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        v-model="dog.color"
        label="Color"
      />

      <q-input
        rounded
        outlined
        v-model="birthDate"
        mask="date"
        :rules="['date']"
        label="Fecha de Nacimiento"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="birthDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        rounded
        outlined
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        v-model="dog.location_chip"
        label="Ubicacion del chip"
      />

      <q-input
        rounded
        outlined
        v-model="chipDate"
        mask="date"
        :rules="['date']"
        label="Fecha en la que pusiste el Chip"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="chipDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

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
            :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
            rounded
            outlined
            v-model="veterinary"
            label="Veterinario de la vacuna"
          />

          <q-input
            rounded
            outlined
            v-model="vaccination_date"
            mask="date"
            :rules="['date']"
            label="Fecha de la vacuna"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="vaccination_date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <div>
        <q-btn
          label="Enviar"
          type="submit"
          color="primary"
          v-on:click="saveDog"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import firebase from "firebase";
export default {
  data() {
    return {
      birthDate: "",
      chipDate: "",
      vaccination_date: "",
      veterinary: "",
      selectVaccine: {},
      dog: {
        user_id: "",
        name: "",
        photo: "",
        weight: "",
        size: "",
        race: "",
        sex: "",
        birth: "",
        color: "",
        chip_date: "",
        location_chip: "",
        vaccine: {
          vaccines_id: "",
          dog_id: "",
          name: "",
          veterinary: "",
          vaccination_date: "",
          expiration: "",
        },
      },
      options: ["Macho", "Hembra"],
      vaccines: [],
      urlVaccines: "http://vps-b0e4feec.vps.ovh.net:8000/api/vaccines/",
      urlBaseDog: "http://vps-b0e4feec.vps.ovh.net:8000/api/dog/",
    };
  },
  created() {
    axios.get(this.urlVaccines).then((e) => {
      const response = e.data;
      response.forEach((element) => {
        this.vaccines.push(element);
      });
    });
    this.getIduser();

    this.selectVaccine = "";
  },
  methods: {
    prepareVaccine() {
      this.dog.vaccine.vaccines_id = this.selectVaccine.id;
      this.dog.vaccine.name = this.selectVaccine.name;
      this.dog.vaccine.veterinary = this.veterinary;
      this.dog.vaccine.expiration = moment(this.vaccination_date)
        .add(this.selectVaccine.days, "days")
        .format("YYYY-MM-DD");
      this.$root.$emit("expiration", this.dog.vaccine.expiration);
    },
    formatDate() {
      this.dog.birth = moment(this.birthDate).format("YYYY-MM-DD");
      this.dog.chip_date = moment(this.chipDate).format("YYYY-MM-DD");
      this.dog.vaccine.vaccination_date = moment(this.vaccination_date).format(
        "YYYY-MM-DD"
      );
    },
    saveDog(e) {
      this.formatDate();
      this.prepareVaccine();
      this.$router.push("/");
      /*axios.post(this.urlBaseDog, this.dog).then((e) => {
        this.$root.$emit("refresh", this.dog.user_id);
       
      });*/
    },
    loadImage(e) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e) => {
        this.dog.photo = e.target.result;
      };
    },
    getIduser() {
      this.dog.user_id = firebase.auth().currentUser.uid;
    },
  },
};
</script>
