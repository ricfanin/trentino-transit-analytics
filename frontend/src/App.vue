/* eslint-disable */
<template>
  <div id="app" class="font-sans">
    <Navbar />

    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>