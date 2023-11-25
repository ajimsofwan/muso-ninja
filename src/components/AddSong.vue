<script setup>
import { ref } from 'vue';
import useDoument from '../composables/useDocument'

const props = defineProps(['playlist'])
const { updateDoc, isPending, error } = useDoument('playlists', props.playlist.id)
const title = ref('')
const artist = ref('')
const showForm = ref(false)

const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: Math.floor(Math.random() * 1000000)
  }

  await updateDoc({
    songs: [...props.playlist.songs, newSong]
  })

  title.value = ''
  artist.value = ''
  showForm.value = false
}
</script>

<template>
  <div class="mb-3">
    <div class="flex lg:justify-between">
      <div>&nbsp;</div>
      <button v-if="!showForm" @click="showForm = true"
        class="text-white w-full lg:w-auto flex flex-wrap justify-center bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm px-5 py-2.5 text-center disabled:bg-primary-light">
        Add Song
      </button>
    </div>
    <div v-if="showForm">
      <div class="p-6 bg-white border shadow border-slate-200 rounded-2xl dark:bg-slate-800 dark:border-slate-700">
        <h1 class="py-2 mb-5 text-2xl font-bold">Add a New Song</h1>
        <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
          role="alert">
          <span class="font-bold">Oops!</span> {{ error }}
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Title</label>
            <input type="text" id="title" v-model="title"
              class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              required>
          </div>
          <div class="mb-6">
            <label for="artist" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Artist</label>
            <input type="text" id="artist" v-model="artist"
              class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              required>
          </div>
          <button type="submit" :disabled="isPending"
            class="text-white flex flex-wrap justify-center bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm w-full px-5 py-2.5 text-center disabled:bg-primary-light">
            <LoadingIcon v-if="isPending" data="w-5 h-5 mr-2" />
            <span v-if="isPending">Processing ...</span>
            <span v-else>Add Song</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>