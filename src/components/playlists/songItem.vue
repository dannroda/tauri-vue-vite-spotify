!<template>
<td>
    <img  :src=songImg.url :width=songImg.width :height=songImg.height />
</td>
<td>
    {{song.name}}
</td>
<td>
    {{song.artists[0].name}}
</td>


</template>
<script setup lang="ts">
const props = defineProps({
    item: Object
})
let song = props.item.track
let songAlbum = song.album
let songImg = songAlbum.images[2]
// console.log(song)
</script>
<style scoped>
    
</style>