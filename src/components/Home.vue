<template >
    <div>
        <Suspense>

            <ListView />
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import songItem from './playlists/songItem.vue';
import ListView from './playlists/listView.vue';
</script>
<style scoped>
    
</style>