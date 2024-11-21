/* eslint-disable */
<template>
  <div class="flex bg-gray-100">
    <div class="flex-1 p-8">
      <!--Post Search e Filtri-->
      <PostSearchFilterBar />

      <!-- Posts -->
      <div class="max-w-4xl mx-auto p-4 space-y-6">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import PostSearchFilterBar from "../components/PostSearchFilterBar.vue";

export default {
  name: "Social",
  components: {
    Post,
    PostSearchFilterBar,
  },
};
</script>
