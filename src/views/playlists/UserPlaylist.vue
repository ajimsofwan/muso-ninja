<script setup>
import ListView from '../../components/ListView.vue';
import getCollection from '../../composables/getCollection';
import getUser from '../../composables/getUser';

const { user } = getUser()
const { documents: playlists, error } = getCollection('playlists',
  ['userId', '==', user.value.uid])

</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="mb-3 text-3xl font-bold">My Playlist</h1>
    </div>
    <div> <router-link :to="{ name: 'CreatePlaylist' }"
        class="text-white lg:w-auto flex flex-wrap justify-center bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-xl text-sm px-5 py-2.5 text-center disabled:bg-primary-light">
        Add Playlist
      </router-link></div>
  </div>
  <ListView :playlists="playlists" />
</template>