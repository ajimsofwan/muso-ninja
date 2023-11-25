<script setup>
import { computed, ref } from 'vue';
import getDocument from '../../composables/getDocument';
import getUser from '../../composables/getUser';
import useDocument from '../../composables/useDocument';
import useStorage from '../../composables/useStorage';
import { useRouter } from 'vue-router';
import AddSong from '../../components/AddSong.vue';

const props = defineProps(['id'])
const { document: playlist, error } = getDocument('playlists', props.id)
const { user } = getUser()
const { updateDoc, deleteDoc, isPending } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()
const router = useRouter()

const ownership = computed(() => {
  return playlist.value && user.value && user.value.uid == playlist.value.userId
})

const handleDelete = async () => {
  await deleteImage(playlist.value.filePath)
  await deleteDoc()
  router.push({ name: 'Home' })
}

const handleClick = async (id) => {
  const songs = playlist.value.songs.filter((song) => song.id != id)
  await updateDoc({ songs })
}

</script>

<template>
  <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
    role="alert">
    <span class="font-bold">Oops!</span> {{ error }}
  </div>
  <div class="lg:flex">
    <div class="mx-auto mb-5 text-center lg:mx-0 lg:mr-8 lg:text-left lg:flex-1 lg:max-w-lg">
      <img :src="playlist.coverUrl" :alt="playlist.id" class="w-full mb-8 rounded-2xl">
      <h3 class="text-4xl font-bold">{{ playlist.title }}</h3>
      <span class="text-xl text-slate-400">Created by {{ playlist.username }}</span>
      <p class="py-4">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete" :disabled="isPending"
        class="text-white flex flex-wrap justify-center bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm w-full px-5 py-2.5 text-center disabled:bg-primary-light">
        <LoadingIcon v-if="isPending" data="w-5 h-5 mr-2" />
        <span v-if="isPending">Processing ...</span>
        <span v-else>Delete Playlist</span>
      </button>
    </div>
    <div class="text-left lg:flex-1">
      <AddSong v-if="ownership" :playlist="playlist" />
      <div v-if="!playlist.songs.length"
        class="p-4 mb-4 text-sm text-center text-amber-800 rounded-xl bg-amber-50 dark:bg-slate-800 dark:text-amber-400"
        role="alert">
        No songs have been added to this playlist.
      </div>
      <div class="overflow-y-auto max-h-[570px]">
        <div v-for="song in playlist.songs" :key="song.id"
          class="flex items-center justify-between p-6 mb-3 mr-1 bg-white border shadow border-slate-200 rounded-2xl dark:bg-slate-800 dark:border-slate-700">
          <div>
            <h3 class="text-xl">{{ song.title }}</h3>
            <p class="text-slate-500">{{ song.artist }}</p>
          </div>
          <div>
            <button v-if="ownership" type="submit" @click="handleClick(song.id)"
              class="flex flex-wrap justify-center w-full px-5 py-1 text-sm font-medium text-center text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light rounded-xl disabled:bg-primary-light">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>