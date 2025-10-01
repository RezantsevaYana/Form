import './assets/main.css';
import 'virtual:svg-icons-register';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(pinia).mount('#app')
