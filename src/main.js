import './assets/main.css'
import 'vue-final-modal/style.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
const vfm = createVfm()

app.use(router)
app.use(pinia)
app.use(vfm)

app.mount('#app')
