// import './assets/main.css'
import './assets/style.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ProgressSpinner from 'primevue/progressspinner';
import App from './App.vue'
import router from './router'

import VueKonva from 'vue-konva';
import PrimeVue from "primevue/config";
import InputText from 'primevue/inputtext';
import {useDriveStore} from '@/stores/drive'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueKonva)
app.use(PrimeVue, { 
    unstyled: true 
});
app.component('InputText', InputText);
app.component('ProgressSpinner', ProgressSpinner);
app.mount('#app')

useDriveStore().connect()








