import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'
// createApp(App).mount('#app')
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
