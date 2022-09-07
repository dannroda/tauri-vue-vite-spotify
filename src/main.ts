import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'
// createApp(App).mount('#app')
const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App).use(router).use(pinia).mount('#app')
