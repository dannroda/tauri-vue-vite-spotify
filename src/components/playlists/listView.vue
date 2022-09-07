!<template>
<n-config-provider :theme="darkTheme">
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
</n-config-provider>


</template>
<script setup lang="ts">
import songItem from './songItem.vue'
import { NTable, darkTheme, NConfigProvider } from 'naive-ui'
import { useDatosStore } from '../../stores/datosSpotify';
const authData = useDatosStore()
const playlists = await authData.getUserPlaylists()
const playlistUrl = playlists.items[1].href
const data = await authData.getApiData(playlistUrl)
const items = data.tracks.items
</script>
<style scoped>

</style> 