<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function redirect() {
  router.push('/')
}
</script>
<template>
  <h1 class="my-4 text-6xl font-bold">404 Not Found</h1>
  <p class="max-w-xl mx-auto text-base leading-relaxed text-gray-500 dark:text-gray-400 pb-5">The destination page is not
    found.
  </p>
  <button
    class="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-extra-light font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-light"
    @click="redirect">Home Page</button>
</template>
