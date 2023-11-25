<script setup>
import { watch } from 'vue';
import useSignOut from '../composables/useSignOut'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router';

const { signOut } = useSignOut()
const { user } = getUser()
const router = useRouter()

const handleLogout = async () => {
  await signOut()
}

watch(user, () => {
  if (!user.value) {
    router.push({ name: 'Login' })
  }
})
</script>

<template>
  <header class="bg-white border-b border-slate-200">
    <nav class="flex items-center justify-between px-4 mx-auto max-w-screen-2xl">
      <div class="flex flex-wrap items-center">
        <img src="../assets/img/ninja-musho.png" alt="logo" class="h-auto mr-2 w-14">
        <h1 class="text-3xl font-bold"><router-link :to="{ name: 'Home' }">Ninja<span
              class="text-primary">Playlists</span></router-link></h1>
      </div>
      <div>
        <ul v-if="!user" class="flex flex-wrap">
          <li class="px-2 py-6 hover:bg-slate-100"><router-link :to="{ name: 'Register' }">Register</router-link></li>
          <li class="px-2 py-6 hover:bg-slate-100"><router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
        </ul>
        <ul v-if="user" class="flex flex-wrap">
          <li class="px-2 py-6 hover:bg-slate-100">
            <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
          </li>
          <li class="px-2 py-6 hover:bg-slate-100">
            <router-link :to="{ name: 'UserPlaylist' }">MyPlaylist</router-link>
          </li>
          <li class="px-2 py-6 hover:bg-slate-100">
            <span>Hi there, {{ user.displayName }}</span>
          </li>
          <li class="px-2 py-6 hover:bg-slate-100"><button @click="handleLogout">Logout</button></li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<!-- <style scoped>
.router-link-active {
  @apply text-primary;
} -->
<!-- </style> -->