/* eslint-disable */
<template>
  <div class="flex">
    <div class="flex-1 p-8">
      <!-- Post Search e Filtri -->
      <div class="max-w-4xl mx-auto p-4 space-y-6">
        <PostSearchFilterBar @filterChanged="onFilterChanged" />
      </div>
      
      <!-- Lista dei Post -->
      <div class="max-w-4xl mx-auto p-4 space-y-6">
        <div v-for="post in posts" :key="post._id">
          <Post :post="post" @post-deleted="removePost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import PostSearchFilterBar from "@/components/PostSearchFilterBar.vue";
import { getAllPostsBySelectedOrder } from "@/services/posts";

export default {
  name: "PostManagement",
  components: {
    Post,
    PostSearchFilterBar,
  },
  data() {
    return {
      posts: [], // Array di post
      currentOrder: 'upvote', // Ordine iniziale
      tags: []
    };
  },
  methods: {
    onFilterChanged(filters) {
      const { order, line } = filters;  
      this.fetchPosts(order, line);
    },
    async fetchPosts(order, line) {
      try {
        const posts = await getAllPostsBySelectedOrder(line, order);
        this.posts = posts;
      } catch (error) {
        console.error("Errore durante il caricamento del post:", error);
      }
    },

    removePost(postId) {
      this.posts = this.posts.filter(post => post._id !== postId);
    }
  },
  mounted() {
    this.fetchPosts("upvote", [""]);
  },
};
</script>
