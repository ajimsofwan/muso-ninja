<script setup>
import { computed, ref } from 'vue';
import getDocument from '../../composables/getDocument';
import getUser from '../../composables/getUser';
import useDocument from '../../composables/useDocument';
import useStorage from '../../composables/useStorage';
import { useRouter } from 'vue-router';

const props = defineProps(['id'])
const { document: playlist, error } = getDocument('playlists', props.id)
const { user } = getUser()
const { deleteDoc, isPending } = useDocument('playlists', props.id)
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
      <button v-if="ownership" @click="handleDelete" :disabled="isPending"
        class="text-white flex flex-wrap justify-center bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm w-full px-5 py-2.5 text-center disabled:bg-primary-light">
        <LoadingIcon v-if="isPending" data="w-5 h-5 mr-2" />
        <span v-if="isPending">Processing ...</span>
        <span v-else>Delete Playlist</span>
      </button>
    </div>
    <div class="text-left">
      song list
    </div>
  </div>
</template>