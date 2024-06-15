import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueEcharts from 'vue-echarts'

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.use(router)

app.component('V-chart', VueEcharts)

app.mount('#app')
