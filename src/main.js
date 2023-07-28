import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.scss'
import '../node_modules/bootstrap/dist/js/bootstrap'

import CanvasJSChart from '../node_modules/@canvasjs/vue-charts';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin

app.mount('#app')
