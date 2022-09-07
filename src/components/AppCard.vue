<script setup lang="ts">
    import Spotify from './Spotify.vue'
    import { ref } from 'vue'
    import {useRoute} from 'vue-router'
    import router from '../router';
    import { useDatosStore } from '../stores/datosSpotify';
import ListView from './playlists/listView.vue';
    const componentKey = ref(0)
    const forceRerender = () => {
      componentKey.value += 1
    }
    const route = useRoute();
    const authData = useDatosStore()
let fullUrl = route.fullPath
console.log(fullUrl)

authData.authCallback(fullUrl).then(() => {router.push('/')})
    </script>
    
    <template>
      <div>
        <!-- <Suspense> -->
          <!-- <Spotify :key=componentKey /> -->
        <!-- </Suspense> -->
      </div>
    </template>
    
    <style scoped>
    
    </style>
    