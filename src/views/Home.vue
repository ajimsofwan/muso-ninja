<script setup>
import ListView from '../components/ListView.vue';
import getCollection from '../composables/getCollection'

const { documents, error } = getCollection('playlists')

</script>
<template>
  <h1 class="text-4xl font-bold">Home</h1>
  <div v-if="error" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-slate-800 dark:text-red-400"
    role="alert">
    <span class="font-medium">Oops!</span> {{ error }}
  </div>
  <div v-if="documents">
    <!-- <div v-for="doc in documents" :key="doc.id">
      <div><img src="" alt=""></div>
      <span>
        {{ doc.title }}
      </span>
      <span>{{ doc.description }}</span>
    </div> -->
    <ListView :playlists="documents" />
  </div>
</template>