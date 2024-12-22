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
              <p class="font-bold text-gray-700 text-xl">10</p>
              <p class="text-gray-400">Posts</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">89</p>
              <p class="text-gray-400">Comments</p>
            </div>
          </div>

          <!-- Immagine Profilo -->
          <div class="relative">
            <div>
              <img
                src="https://picsum.photos/200/300"
                class="w-36 h-36 sm:w-48 sm:h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24"
              />
            </div>
          </div>

          <!-- Buttons -->
          <div
            class="flex flex-wrap justify-between md:justify-center space-x-4 mt-16 md:mt-0"
          >
            <router-link to="/ModificaProfilo">
              <button
                class="mt-4 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600"
              >
              Modifica Profilo
              </button>
            </router-link>
            <PostButton />
          </div>
        </div>

        <!-- Username -->
        <div class="mt-24 text-center pb-8">
          <h1 class="text-2xl font-bold sm:text-4xl text-gray-700">
            {{ username }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Lista dei Post -->
    <div class="max-w-4xl mx-auto p-4 space-y-6">
      <!-- <h2 class="text-2xl font-bold mb-6">I Tuoi Post</h2> -->

      <!-- Singolo Post -->
      <Post />
      <Post />
      <Post />
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import PostButton from "../components/PostButton.vue";
import apiClient from "@/services/api";

export default {
  name: "Profilo",
  components: {
    Post,
    PostButton,
  },

  data(){
    return {
      username: "",
    };
  },

  methods: {
    async getProfile(){
      try{
        const response = await apiClient.get('/profile');
        this.username = response.data.name;
      } catch{
        alert("errore profilo");
      }
    }
  },

  created : function() {
    this.getProfile()
  },

};
</script>
