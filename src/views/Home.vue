<script setup>
import ListView from '../components/ListView.vue';
import getCollection from '../composables/getCollection'

const { documents, error } = getCollection('playlists')

</script>
<template>
  <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
    role="alert">
    <span class="font-medium">Oops!</span> {{ error }}
  </div>
  <div v-if="documents">
    <ListView :playlists="documents" />
  </div>
</template>