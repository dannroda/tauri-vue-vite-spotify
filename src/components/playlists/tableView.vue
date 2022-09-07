!<template>
    <n-table bordered>
        <thead>
        <tr>
            <th>Title</th>
            <th>Album</th>
            <th>Duracion</th>
        </tr>
    </thead>
    <tbody>
            <tr v-for="item in items" >
                <songItem :item="item" />
            </tr>
        </tbody>
    </n-table>


</template>
<script setup lang="ts">
import songItem from './songItem.vue'
import { NTable } from 'naive-ui'
import { useDatosStore } from '../../stores/datosSpotify';
const props = defineProps({
    href: String
})
const authData = useDatosStore()
console.log('[props]',props.href)
// const likedSongs = await authData.getUserLikes()
// const playlists = await authData.getUserPlaylists()
// const playlistUrl = playlists.items[1].href
 const data = await authData.getApiData(props.href)
 const items = data.tracks.items
// const items = likedSongs.items
 console.log('likes',data)
</script>
<style scoped>

</style> 