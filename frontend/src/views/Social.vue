/* eslint-disable */
<template>
  <div class="flex">
    <div class="flex-1 p-8">
      <!--Post Search e Filtri-->
      <PostSearchFilterBar  @orderChanged="updateOrder" />

      <!-- Posts -->
      <div class="max-w-4xl mx-auto p-4 space-y-6">
        <!-- Singolo Post -->
        <div v-for="post in posts" :key="post._id">
          <Post :postId="post._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import PostSearchFilterBar from "../components/PostSearchFilterBar.vue";
import { getAllPostsBySelectedOrder } from "@/services/posts";

export default {
  name: "Social",
  components: {
    Post,
    PostSearchFilterBar,
  },
  data() {
    return {
      posts: [], // Array di post
      currentOrder: 'upvote', 
      tags: []// Ordine iniziale
    };
  },
  methods: {
    updateOrder(order) {
      this.currentOrder = order;
      this.fetchPosts();
    },

    async fetchPosts() {
      try {
        const posts = await getAllPostsBySelectedOrder(this.tags, this.currentOrder);
        this.posts = posts;
      } catch (error) {
        console.error("Errore durante il caricamento del post:", error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
