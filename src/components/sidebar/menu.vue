<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"


      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          
        />
      </n-layout-sider>
      <n-layout>
        <span><TableView :href=urlPlaylist :key=playlistId /></span>
      </n-layout>
    </n-layout>
  </n-space>
</template>
<script setup lang="ts">
import { NSpace,NMenu, NLayoutSider, NIcon, NLayout } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useDatosStore } from '../../stores/datosSpotify';
import TableView from '../playlists/tableView.vue';
import { h, ref, watch } from 'vue'
const authData = useDatosStore()
// const likedSongs = await authData.getUserLikes()
let urlPlaylist = ref('')
let playlistId = ref('')
const playlists = await authData.getUserPlaylists()
const items = playlists.items
const menuOptions: MenuOption[] = []
items.forEach((item:any,index:number) => {
    menuOptions.push({
        label: () => h(
          'a',{
            onClick: () => {
              updateTable(item)
            }
          },
          item.name
          ), 
        key: item.id,
    })
})
const updateTable = (item:any) =>{
  urlPlaylist.value = item.href
  playlistId.value = item.id
  console.log('[MENU]',urlPlaylist)
}

</script>
<style scoped>
    
</style>