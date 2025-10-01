import './assets/main.css';
import 'virtual:svg-icons-register';
import { createPinia } from 'pinia';
const pinia = createPinia();

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(pinia).mount('#app')
