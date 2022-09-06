import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from './api';
// import songList from './components/songList.vue';
import Home from './components/Home.vue'
// import Spotify from './components/Spotify.vue'
import AppCard from './components/AppCard.vue'
// import { useUserStore } from './stores/user'

// const requireAuth = async(to, from, next) => {
//     const userStore = useUserStore()
//     userStore.loadingSession = true
//     const user = await userStore.currentUser()
//     if (user) {
//         next()
//     } else {
//         next('/login')
//     }
//     userStore.loadingSession = false
// }
let callback = getAuth(import.meta.env.VITE_SPOTIFY_CLIENT_ID)
const routes = [
    { path: '/', component: Home,name: 'home' },
    { path: '/auth/callback', hash: '#access-token', component: AppCard, name: 'Queue' },
    // { path: '/login', component: Login, name: 'login' },
    // { path: '/register', component: Register, name: 'register' },

];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;