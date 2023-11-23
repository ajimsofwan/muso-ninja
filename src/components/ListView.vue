<script setup>
import { ref } from 'vue';

const props = defineProps(['playlists'])

</script>

<template>
  <div class="grid gap-4 py-6 lg:grid-cols-2">
    <router-link v-for="playlist in playlists" :key="playlist.id"
      :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }"
      class="flex items-center justify-between p-6 space-x-6 duration-200 bg-white border shadow ease border-slate-200 rounded-2xl dark:bg-slate-800 dark:border-slate-700 hover:scale-[1.02]">
      <div class="flex-none">
        <img :src="playlist.coverUrl" :alt="playlist.id" class="w-40 rounded-lg">
      </div>
      <div class="flex-1 text-left">
        <h3 class="text-4xl font-bold">{{ playlist.title }}</h3>
        <span class="text-xl">Created by {{ playlist.username }}</span>
      </div>
      <div class="flex-none"><span class="text-4xl font-bold">{{ playlist.songs.length }}</span></div>
    </router-link>
  </div>
</template>