<script setup lang="ts">
import { watch,ref } from "vue";
import { useRoute } from "vue-router";
import {
  getCurrentUserQueue,
  getCurrentSong,
  getTrackInfo,
} from "../api/index";
const route = useRoute();

let fullUrl = route.fullPath.replace("/auth/callback#", "");

let datos = {
  access_token: fullUrl.split("&")[0].replace("access_token=", ""),
  token_type: fullUrl.split("&")[1].replace("token_type=", ""),
  expires_in: fullUrl.split("&")[2].replace("expires_in=", ""),
  state: fullUrl.split("&")[3].replace("state=", ""),
};
let existe = false
// const qeueu = await getCurrentUserQueue(datos.access_token);
type Song = {
  title: String,
  artist: String,
  albumCover: string,
  duration:number,
  actual:number
}
let currentSong: Song = {
  title: 'titulo',
  artist: 'artista',
  albumCover: '',
  duration: 0,
  actual: 0
}
// const currentSong = await getTrackInfo(datos.access_token, qeueu.currently_playing.href)
const updateCurrentSong = async () => {
  let songInfo = await getCurrentSong(datos.access_token);
  console.log("[SongInfo]", songInfo);
  currentSong.albumCover = songInfo.item.album.images[0].url;
  currentSong.artist = songInfo.item.artists[0].name;
  currentSong.title = songInfo.item.name;
  currentSong.actual = songInfo.progress_ms;
  currentSong.duration = songInfo.item.duration_ms;
  console.log("[PROGRESO MS]", currentSong.actual);
  console.log("[DURACION MS]", currentSong.duration);
  return currentSong
};
if (existe === false) {
  console.log('no existe')
  currentSong = await updateCurrentSong();
  existe = true
  console.log("VALUE SONG",currentSong)
}
const convertTime = (n: number) => {
  var minutes = Math.floor(n / 60000);
  var seconds = parseInt(((n % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
// console.log(typeof(actual), actual)
let int = 0;
// console.log(actual)
let progreso = ref(0);
const updateProgress = async () => {
  progreso.value = parseInt(((currentSong.actual / currentSong.duration) * 100).toFixed(3));
  if (currentSong.actual < currentSong.duration) {
    currentSong.actual += 1000;
  }
  
  if (currentSong.actual >= currentSong.duration) {
    console.log("CLEAR");
    clearInterval(interval);
    currentSong = await updateCurrentSong();
    existe = false
  }
};
let interval = setInterval(updateProgress, 1000)
watch(progreso, (count, prevCount) => {
    console.log("[PROGRESO]", count);
    if(count >= 99){
      progreso.value = 0
      console.log('[UPDATE INTERVAL]')
      interval = setInterval(updateProgress, 1000)
    }
  })

console.log('tipo', interval)

// console.log(actual.value,num)

// let actual = updateCurrentSongTime(progress)
// setTimeout(() =>updateCurrentSong(),faltante)
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <!-- CARD 1 -->
    <div class="bg-gray-900 shadow-lg rounded p-3">
      <div class="group relative">
        <img class="w-full md:w-72 block rounded" :src="currentSong.albumCover" alt="" />
        <div
          class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"
        >
          <button
            class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
          </button>

          <button
            class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
              />
            </svg>
          </button>

          <button
            class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="p-5">
        <div class="flex justify-between mb-1">
          <span class="text-base font-medium text-blue-700 dark:text-white">{{
            convertTime(currentSong.actual)
          }}</span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">{{
            convertTime(currentSong.duration)
          }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-blue-600 h-2.5 rounded-full"
            :style="{ width: progreso + '%' }"
          ></div>
        </div>
        <h3 class="text-white text-lg">{{ currentSong.title }}</h3>
        <p class="text-gray-400">{{ currentSong.artist }}</p>
      </div>
    </div>
    <!-- END OF CARD 1 -->
  </section>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
}
</style>
