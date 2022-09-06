<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { getAuth } from "./api/index";
    var clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    let authtest = ''
    try{
      authtest = getAuth(clientId)
    }catch (error){
      console.log('[ERROR OAUTH]',error)
    }
</script>

<template>
  <router-link to="/">Inicio </router-link>
<a :href=authtest>Login </a>
<router-view></router-view>
</template>

<style scoped>

</style>
