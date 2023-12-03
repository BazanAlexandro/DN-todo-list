import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { vueQueryConfig } from './utils/config/vue-query';

const app = createApp(App)
app.use(VueQueryPlugin, vueQueryConfig)

app.mount('#app')