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
              label="Rounded outlined"
            />
            <template>
              <div class="q-pa-md" style="max-width: 300px">
                <q-input
                  filled
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
              <div class="q-pa-md" style="max-width: 300px">
                <q-input
                  filled
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
              label="Añadir Evento"
              color="primary"
              @click="saveEvent"
            />
            <q-btn
              v-if="!edit"
              label="Actualizar Evento"
              color="warning"
              @click="updateEvent"
            />
            <q-btn
              v-if="!deleted"
              label="Borrar Evento"
              color="negative"
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
import axios from "axios";

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
        user_id: "",
        title: "",
        startStr: "",
        endStr: "",
      },
      editEvent: {
        id: "",
        user_id: "",
        title: "",
        startStr: "",
        endStr: "",
      },
      position: "top",
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        locale: es,
        selectable: true,
        initialEvents: this.events,
        select: this.handleSelect,
        eventClick: this.handleEvents,
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
      urlCalendar: "http://vps-b0e4feec.vps.ovh.net:8000/api/calendar/",
    };
  },
  created() {
    this.getIduser();
    this.getEvents();
    this.$root.$on("expiration", (expiracion) => {
      const nes = {
        user_id: this.newEvent.user_id,
        title: "Proxima Vacuna",
        startStr: expiracion,
        endStr: moment(expiracion)
          .add(1, "days")
          .format("YYYY-MM-DD"),
      };
      this.newEvent = nes;
      console.log(this.newEvent);
      this.saveEvent();
      this.newEvent = "";
    });
  },
  methods: {
    getIduser() {
      this.newEvent.user_id = firebase.auth().currentUser.uid;
    },
    open(position) {
      this.position = position;
      this.dialog = true;
    },
    handleSelect(arg) {
      this.dialog = true;
      this.resetForm();
      this.newEvent = {
        user_id: this.newEvent.user_id,
        title: arg.title,
        startStr: arg.startStr,
        endStr: arg.endStr,
      };
    },

    deleteEvent() {
      axios
        .delete(this.urlCalendar + this.newEvent.id)
        .then((e) => {
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
        user_id: this.newEvent.user_id,
        title: this.newEvent.title,
        startStr: moment(this.newEvent.startStr).format("YYYY-MM-DD"),
        endStr: moment(this.newEvent.endStr).format("YYYY-MM-DD"),
      });

      axios
        .post(this.urlCalendar, this.newEvent)
        .then((e) => {
          this.getEvents();
        })
        .catch((err) => console.log(err.response.data));
    },
    getEvents() {
      axios
        .get(this.urlCalendar + this.newEvent.user_id)
        .then((e) => {
          this.calendarOptions.events = e.data;
        })
        .catch((err) => console.log(err.response.data));
    },
    handleEvents(arg) {
      this.add = false;
      this.dialog = true;
      this.edit = false;
      this.deleted = false;
      this.newEvent = {
        id: arg.event.id,
        user_id: this.newEvent.user_id,
        title: arg.event.title,
        startStr: moment(arg.event.startStr).format("YYYY-MM-DD"),
        endStr: moment(arg.event.endtStr).format("YYYY-MM-DD"),
      };
      this.add = true;
    },

    updateEvent() {
      this.editEvent = {
        id: this.newEvent.id,
        user_id: this.newEvent.user_id,
        title: this.newEvent.title,
        startStr: moment(this.newEvent.startStr).format("YYYY-MM-DD"),
        endStr: moment(this.newEvent.endStr).format("YYYY-MM-DD"),
      };

      axios
        .put(this.urlCalendar + this.editEvent.id, this.editEvent)
        .then((e) => {
          this.getEvents();
          this.dialog = false;
        })
        .catch((err) => console.log(err.response.data));
      this.resetForm();
    },
    resetForm() {
      this.edit = true;
      this.deleted = true;
    },
  },
};
</script>
