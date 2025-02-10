/* eslint-disable */
<template>
  <div>
    <!-- Profilo Utente -->
    <div class="p-4 sm:p-8 lg:p-16 mx-auto max-w-screen-lg">
      <div class="p-6 bg-white border-2 rounded-lg shadow-md mt-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-y-8 items-center">
          <!-- Conteggio Post e Commenti -->
          <div
            class="grid grid-cols-2 md:grid-cols-3 text-center order-last md:order-first mt-8 md:mt-0"
          >
            <div>
              <p class="font-bold text-text_2 text-xl">{{post_count}}</p>
              <p class="text-text_3">Posts</p>
            </div>
            <div>
              <p class="font-bold text-text_2 text-xl">{{comment_count}}</p>
              <p class="text-text_3">Comments</p>
            </div>
          </div>

          <!-- Immagine Profilo -->
          <div class="relative">
            <div>
              <img
                src="https://picsum.photos/200/300"
                class="w-36 h-36 sm:w-48 sm:h-48 bg-text-text_3 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24"
              />
            </div>
          </div>

          <!-- Buttons -->
          <div
            class="flex flex-wrap justify-between md:justify-center space-x-4 mt-16 md:mt-0"
          >
            <router-link to="/ModificaProfilo">
              <button class="mt-4 px-4 py-2 bg-button_1 text-text_1 rounded-md hover:bg-button_1_hover font-medium shadow-md">
              Modifica Profilo
              </button>
            </router-link>
            <PostButton />
          </div>
        </div>

        <!-- Username -->
        <div class="mt-24 text-center pb-8">
          <h1 class="text-2xl font-bold sm:text-4xl text-text-text_2">
            {{ username }}
          </h1>
          <div class="mt-2 text-lg text-text_3">
            <p>{{ name }} {{ surname }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista dei Post -->
    <div class="max-w-4xl mx-auto p-4 space-y-6">
      <!-- <h2 class="text-2xl font-bold mb-6">I Tuoi Post</h2> -->

      <!-- Singolo Post -->
      <div v-for="post in posts" :key="post.id">
        <Post :post="post" @post-deleted="removePost"/>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import PostButton from "@/components/PostButton.vue";
import { getUserPosts } from "@/services/posts";
import { getCommentByUser } from "@/services/commets";
import apiClient from "@/services/api";

export default {
  name: "Profilo",
  components: {
    Post,
    PostButton,
  },

  data() {
    return {
      username: "",
      name: "",
      surname: "",
      post_count: 0,
      comment_count: 0,
      posts: [], // Array per salvare i post dell'utente
    };
  },

  methods: {
    // Recupera le informazioni del profilo
    async getProfile() {
      try {
        const response = await apiClient.get("/profile");
        this.username = response.data.username;
        this.name = response.data.name;
        this.surname = response.data.surname;
      } catch (error) {
      }
    },

    async getCommentNumber(){
      try {
        const userId = localStorage.getItem("user_id");
        const comments = await getCommentByUser(userId);
        this.comment_count = comments.length;
      } catch (error) {
      }
    },

    async fetchUserPosts() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          throw new Error("User ID non trovato.");
        }

        const posts = await getUserPosts(userId);
        this.posts = posts; 
        this.post_count = posts.length;
      } catch (error) {
        alert("Errore durante il caricamento dei post dell'utente.");
      }
    },

    removePost(postId) {
      this.posts = this.posts.filter(post => post._id !== postId);
      this.post_count = this.posts.length;
    }
  },

  async created() {
    await this.getProfile();
    await this.getCommentNumber();
    await this.fetchUserPosts();
  },
};
</script>