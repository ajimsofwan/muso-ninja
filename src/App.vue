<script setup>
import Navbar from './components/Navbar.vue';

// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <Navbar />
  <section class="px-5 py-10 text-center">
    <router-view />
  </section>
</template>
