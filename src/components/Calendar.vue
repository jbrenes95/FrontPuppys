<template>
  <div>
    <Fullcalendar :options="calendarOptions" />
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div>
            <q-input
              rounded
              outlined
              v-model="newEvent.title"
              label="Titulo del evento"
            />
            <template>
              <q-chip
                color="secondary"
                text-color="white"
                icon="alarm"
                label="Fecha Inicio"
              />
              <div class="q-pa-md" style="max-width: 300px">
                <q-input
                  rounded
                  outlined
                  v-model="newEvent.startStr"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="newEvent.startStr">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>

            <template>
              <q-chip
                color="secondary"
                text-color="white"
                icon="alarm"
                label="Fecha Fin"
              />
              <div class="q-pa-md" style="max-width: 300px">
                <q-input
                  rounded
                  outlined
                  v-model="newEvent.endStr"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="newEvent.endStr">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
            <q-btn
              v-if="add"
              label="Añadir"
              color="secondary"
              @click="saveEvent"
            />
            <q-btn
              class="q-ml-sm"
              v-if="!edit"
              label="Actualizar"
              color="secondary"
              @click="updateEvent"
            />
            <q-btn
              class="q-ml-sm"
              v-if="!deleted"
              label="Borrar"
              color="secondary"
              @click="deleteEvent"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Fullcalendar, { collectFromHash } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import es from "@fullcalendar/core/locales/es";
import moment from "moment";
import firebase from "firebase";
import { axios } from "../apis/axios";
import constants from "../constants";

export default {
  components: {
    Fullcalendar,
  },
  data() {
    return {
      dialog: false,
      edit: true,
      add: true,
      deleted: true,
      newEvent: {
        id: "",
        userId: "",
        title: "",
        startStr: "",
        endStr: "",
      },
      editEvent: {
        id: "",
        userId: "",
        title: "",
        startStr: "",
        endStr: "",
      },
      position: "top",
      //Objeto de configuracion de FullCalendar
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        locale: es,
        selectable: true,
        initialEvents: this.events,
        select: this.dragEventCalendar,
        eventClick: this.captureClickEventCalendar,
        events: [],
        editable: true,
        selectMirror: true,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        buttonText: {
          today: "Hoy",
          month: "Mes ",
          week: "Semana",
          day: "Dia",
        },
      },
      urlCalendar: constants.urlsApi.calendar,
      urlEmail: constants.urlsApi.mail,
      currentUser: "",
    };
  },
  created() {
    this.getIduser();
    this.getEvents();
    //recibe la fecha de la siguiente vacuna y añade un evento en el calendario
    this.$root.$on("expiration", (expiracion) => {
      let nextVaccine = {
        userId: this.newEvent.userId,
        title: "Proxima Vacuna",
        startStr: expiracion,
        endStr: moment(expiracion)
          .add(1, "days")
          .format("YYYY-MM-DD"),
      };
      this.newEvent = nextVaccine;
      this.saveEvent();
      this.sendEmail(expiracion);

      this.newEvent = "";
    });
  },
  methods: {
    sendEmail(expiracion) {
      const mail = {
        email: this.currentUser.email,
        expiracion: expiracion,
        nameDog: this.$store.state.UsersDog.name,
      };
      axios
        .post(this.urlEmail, mail)
        .catch((err) => console.log(err.response.data));
    },
    getIduser() {
      this.currentUser = firebase.auth().currentUser;
      this.newEvent.userId = this.currentUser.uid;
    },
    open(position) {
      this.position = position;
      this.dialog = true;
    },
    dragEventCalendar(eventCalendar) {
      this.dialog = true;
      this.resetForm();
      this.newEvent = {
        userId: this.newEvent.userId,
        title: eventCalendar.title,
        startStr: eventCalendar.startStr,
        endStr: eventCalendar.endStr,
      };
    },
    deleteEvent() {
      axios
        .delete(this.urlCalendar + this.newEvent.id)
        .then(() => {
          this.getEvents();
          this.dialog = false;
          this.resetForm();
        })
        .catch((err) => console.log(err.response.data));
      this.resetForm();
    },
    saveEvent() {
      this.dialog = false;
      this.calendarOptions.events.push({
        userId: this.newEvent.userId,
        title: this.newEvent.title,
        startStr: moment(this.newEvent.startStr).format("YYYY-MM-DD"),
        endStr: moment(this.newEvent.endStr).format("YYYY-MM-DD"),
      });

      axios
        .post(this.urlCalendar, this.newEvent)
        .then(() => {
          this.getEvents();
        })
        .catch((err) => console.log(err.response.data));
    },
    getEvents() {
      axios
        .get(this.urlCalendar + this.newEvent.userId)
        .then((events) => {
          this.calendarOptions.events = events.data;
        })
        .catch((err) => alert(err.response.data));
    },
    captureClickEventCalendar(event) {
      //metodo de captura del evento click
      this.add = false;
      this.dialog = true;
      this.edit = false;
      this.deleted = false;
      this.newEvent = {
        id: event.event.id,
        userId: this.newEvent.userId,
        title: event.event.title,
        startStr: moment(event.event.startStr).format("YYYY-MM-DD"),
        endStr: moment(event.event.endtStr).format("YYYY-MM-DD"),
      };
      this.add = true;
    },

    updateEvent() {
      this.editEvent = {
        id: this.newEvent.id,
        userId: this.newEvent.userId,
        title: this.newEvent.title,
        startStr: moment(this.newEvent.startStr).format("YYYY-MM-DD"),
        endStr: moment(this.newEvent.endStr).format("YYYY-MM-DD"),
      };
      axios
        .put(this.urlCalendar + this.editEvent.id, this.editEvent)
        .then(() => {
          this.getEvents();
          this.dialog = false;
        })
        .catch((err) => alert(err.response.data));
      this.resetForm();
    },
    resetForm() {
      this.edit = true;
      this.deleted = true;
    },
  },
};
</script>
