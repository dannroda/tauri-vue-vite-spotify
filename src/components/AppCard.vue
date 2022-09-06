<script setup lang="ts">
    import Spotify from './Spotify.vue'
    import { ref } from 'vue'
    const componentKey = ref(0)
    const forceRerender = () => {
      componentKey.value += 1
    }
    </script>
    
    <template>
      <div>
        <Suspense>
          <Spotify :key=componentKey />
        </Suspense>
      </div>
    </template>
    
    <style scoped>
    
    </style>
    