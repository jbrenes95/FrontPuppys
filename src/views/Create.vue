<template>
  <div>
    <q-form class="div-form" ref="myForm">
      <q-input
        rounded
        outlined
        class="q-mt-md"
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        v-model="dog.name"
        label="Nombre"
      />

      <q-input
        rounded
        outlined
        type="file"
        class="upload-file"
        @change="loadImage"
        label="sdas"
      />
      <button class="upload-button">Subir Imagen</button>
      <q-input
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
        rounded
        outlined
        class="q-mt-md"
        type="number"
        v-model="dog.weight"
        label="Peso"
      />
      <q-input
        rounded
        outlined
        v-model="dog.size"
        label="Tamaño
        "
        :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
      />
      <q-input rounded outlined v-model="dog.race" label="Raza" />

      <q-select
        class="q-mt-md"
        rounded
        outlined
        v-model="dog.sex"
        :options="options"
        label="Genero"
      />

      <q-input
        class="q-mt-lg"
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
        label="Fecha de colocacion de Chip"
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

      <q-card class="card-vaccines">
        <q-card-section>
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
            :rules="[(val) => val.length > 0 || 'No puede estar vacio']"
            rounded
            outlined
            v-model="veterinary"
            label="Veterinario"
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
          style="margin: 5% 0 5% 40%"
          v-on:click="saveDog"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { axios } from "../apis/axios";
import moment from "moment";
import firebase from "firebase";
import constants from "../constants";
export default {
  data() {
    return {
      birthDate: "",
      chipDate: "",
      vaccination_date: "",
      veterinary: "",
      selectVaccine: {},
      dog: {
        userId: "",
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
      urlVaccines: constants.urlsApi.vaccines,
      urlBaseDog: constants.urlsApi.dog,
    };
  },
  created() {
    axios
      .get(this.urlVaccines)
      .then((vaccines) => {
        vaccines.data.forEach((vaccine) => {
          this.vaccines.push(vaccine);
        });
      })
      .catch((err) => alert(err.response.data.message));
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
      console.log(this.dog.vaccine.expiration);
      this.$root.$emit("expiration", this.dog.vaccine.expiration);
    },
    formatDate() {
      this.dog.birth = moment(this.birthDate).format("YYYY-MM-DD");
      this.dog.chip_date = moment(this.chipDate).format("YYYY-MM-DD");
      this.dog.vaccine.vaccination_date = moment(this.vaccination_date).format(
        "YYYY-MM-DD"
      );
    },
    saveDog() {
      this.$refs.myForm.validate().then((success) => {
        success ? this.saveDogApi() : this.$q.notify(constants.alert);
      });
    },
    saveDogApi() {
      this.formatDate();
      this.prepareVaccine();
      this.$router.push(constants.routes.dashboard);
      axios
        .post(this.urlBaseDog, this.dog)
        .then(() => {
          this.$root.$emit("refresh", this.dog.userId);
        })
        .catch((err) => alert(err.response.data.message));
    },
    loadImage(e) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e) => {
        this.dog.photo = e.target.result;
      };
    },
    getIduser() {
      this.dog.userId = firebase.auth().currentUser.uid;
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
.upload-file {
  opacity: 0;
  position: absolute;
}
.upload-button {
  border-radius: 5%;
  border: none;
  color: "primary";
  width: 268px;
  height: 50px;
  background: var(--q-color-primary) !important;
}
</style>
