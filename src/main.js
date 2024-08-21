import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueEcharts from 'vue-echarts'
// import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.use(router)

app.component('V-chart', VueEcharts)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
