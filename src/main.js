import './assets/all.scss'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules/dist/vee-validate-rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { toast, alert } from '@/js/swal.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

pinia.use(({ store }) => {
  store.toast = toast
  store.alert = alert
})

app.use(router)

// axios
app.use(VueAxios, axios)

// loading
app.component('VLoading', Loading)

// vee-validate
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zh })
})
setLocale('zh_TW')

app.mount('#app')
