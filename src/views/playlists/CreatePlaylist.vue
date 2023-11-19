<script setup>
import { ref } from 'vue';
import LoadingIcon from '../../components/LoadingIcon.vue';
import useStorage from '../../composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'

const emit = defineEmits(['show', 'signin'])
const title = ref('')
const description = ref('')
const file = ref(null)
const fileError = ref(null)
const isPending = ref(false)

const { filePath, url, uploadImage } = useStorage()
const { addDoc, error } = useCollection('playlists')
const { user } = getUser()

const handleSubmit = async () => {
  if (file.value) {
    isPending.value = true
    await uploadImage(file.value)
    await addDoc({
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      username: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestamp()
    })
    if (!error.value) {
      console.log('playlist added')
    }
    isPending.value = false
  } else {
    error.value = 'Image cover required'
  }
}

const types = ['image/jpeg', 'image/png']
const handleChange = (e) => {
  const selected = e.target.files[0]

  if (selected && types.includes(selected.type)) {
    file.value = selected
    fileError.value = null
  } else {
    file.value = null
    fileError.value = 'Image only support png or jpg'
  }
}
</script>

<template>
  <div class="max-w-md py-10 mx-auto text-left">
    <div class="p-6 bg-white border shadow border-slate-200 rounded-2xl dark:bg-slate-800 dark:border-slate-700">
      <h1 class="py-2 text-2xl font-bold">Sign In</h1>
      <p class="mb-4 text-slate-500">Sign in to musho ninjas...</p>
      <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
        role="alert">
        <span class="font-medium">Oops!</span> {{ error }}
      </div>
      <div v-if="fileError" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
        role="alert">
        <span class="font-medium">Oops!</span> {{ fileError }}
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label for="title" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Title</label>
          <input type="text" id="title" v-model="title"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            required>
        </div>
        <div class="mb-6">
          <label for="description"
            class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Description</label>
          <textarea id="description" v-model="description"
            class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"> </textarea>
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Upload cover
            playlist image</label>
          <input type="file" name="cover" id="cover" @change="handleChange"
            class="block w-full text-sm border border-gray-200 rounded-lg shadow-sm focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400">
        </div>
        <button type="submit" :disabled="isPending"
          class="text-white flex flex-wrap justify-center bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm w-full px-5 py-2.5 text-center disabled:bg-primary-light">
          <LoadingIcon v-if="isPending" data="w-5 h-5 mr-2" />
          <span v-if="isPending">Processing ...</span>
          <span v-else>Create Playlist</span>
        </button>
      </form>
    </div>
  </div>
</template>