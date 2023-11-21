<script setup>
import getDocument from '../../composables/getDocument';
import getUser from '../../composables/getUser';

const props = defineProps(['id'])
const { document: playlist, error } = getDocument('playlists', props.id)

</script>

<template>
  <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
    role="alert">
    <span class="font-medium">Oops!</span> {{ error }}
  </div>
  <div class="flex-wrap p-6 lg:flex">
    <div class="mx-auto text-center lg:mx-0 lg:mr-8 lg:text-left">
      <img :src="playlist.coverUrl" :alt="playlist.id" class="mb-8 rounded-2xl w-96">
      <h3 class="text-4xl font-bold">{{ playlist.title }}</h3>
      <span class="text-xl text-slate-400">Created by {{ playlist.username }}</span>
      <p class="py-4">{{ playlist.description }}</p>
    </div>
    <div class="text-left">
      song list
    </div>
  </div>
</template>