import Vue from 'vue'

import './styles/quasar.sass'
import lang from 'quasar/lang/es.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Notify } from 'quasar'

Vue.use(Quasar, {
  config: {
    notify:{}
  },
  plugins: {
    Notify
  },
  lang: lang
 })