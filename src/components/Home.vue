<template >
<n-config-provider :theme="darkTheme">
        <Suspense>
            <Menu />
        </Suspense>
        </n-config-provider>
</template>
<script setup lang="ts">
import {darkTheme, NConfigProvider} from 'naive-ui'
import songItem from './playlists/songItem.vue';
import TableView from './playlists/tableView.vue';
import Menu from './sidebar/menu.vue';
</script>
<style scoped>
    
</style>