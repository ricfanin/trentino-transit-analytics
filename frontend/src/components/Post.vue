<template>
  <!-- Post -->
  <div v-if="isPostValid" class="bg-white p-6 border-2 rounded-lg shadow-md">
    <!-- Titolo -->
    <div class="place-items-center">
      <span class="font-bold text-text_2 text-2xl">{{post.title}}</span>
    </div>
    <!-- Linea e Username -->
    <div class="flex justify-between mb-4">
      <div class="flex space-x-2">
        <!-- Itera sulla lista dei tag per creare i componenti Tag -->
        <Tag
          v-for="(tag, index) in tags"
          :key="index"
          :tag="tag"
        />
      </div>
      <span class="text-text_2 flex items-center"> {{post.author_id.username}} </span>
    </div>
    <!-- Descrizione Post -->
    <p class="text-text_2 mb-4">
      {{ post.content }}
    </p>
    <!-- Pulsanti Like, Commenta, Condividi -->
    <div class="flex justify-between space-x-4">
      <div class="flex items-center space-x-2 bg-button_1 rounded-3xl">
        <!-- Upvote -->
        <button
          @click="vote('upvote')" 
          class="flex items-center px-2 py-2 rounded-3xl hover:bg-button_1_hover"
        >
          <div class="text-text_1 md:order-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 18.75 7.5-7.5 7.5 7.5"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        </button>
        <!-- Conteggio -->
        <div class="flex items-center text-text_1">{{netScore}}</div>
        <!-- Downvote -->
        <button
          @click="vote('downvote')"
          class="flex items-center px-2 py-2 rounded-3xl hover:bg-button_1_hover"
        >
          <div class="text-text_1 md:order-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </svg>
          </div>
        </button>
      </div>

      <!-- Loading Spinner -->
      <div v-show="isLoading" class="pt-2 flex justify-center w-full" role="status">
          <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>

      <div class="flex flex-row gap-2">
        <!-- Commenta -->
        <router-link  :to="{ name: 'CommentSection', query: { postId: this.post._id } }">
          <button
            class="flex items-center px-2 py-2 bg-button_1 rounded-3xl hover:bg-button_1_hover"
          >
            <div class="text-text_1 md:order-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </div>
          </button>
        </router-link>
      <!-- Condividi -->
      <button
        class="flex items-center px-2 py-2 bg-button_1 rounded-3xl hover:bg-button_1_hover"
      >
        <div class="text-text_1 md:order-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </div>
      </button>
      <button 
        v-if="isAdmin || isAuthor"
        @click="deletePost"
        class="bg-red-700 flex items-center px-2 py-2 rounded-3xl hover:bg-red-800 w-auto"
      >
        <svg class="h-5 w-5 text-gray-100" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>

      </div>
    </div>
  </div>
  <div v-else>
    <p>Caricamento o dati non validi...</p>
  </div>

</template>

<script>
import Tag from './Tag.vue'; 
import { getTagsById } from '@/services/tags';
import { deletePost, updatePostVote } from "@/services/posts";

export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    Tag,
  },
  data() {
    return {
      tags: [],
      localPost: this.post,
      isAdmin: localStorage.getItem("user_role") === "admin",
      isAuthor: localStorage.getItem("user_id") === this.post.author_id._id,
      isLoading: false,
    };
  },
  computed: {
    isPostValid() {
      return this.localPost;
    },
    netScore() {
      return this.localPost.upvote - this.localPost.downvote;
    },
  },
  methods: {
    async vote(type) {
      try {
        this.isLoading = true;
        const updatedPost = await updatePostVote(this.localPost._id, localStorage.getItem("user_id"), type, false); 
        this.localPost = updatedPost;
      } catch (error) {
        console.error("Errore durante l'aggiornamento del voto:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async deletePost() {
      try {
        this.isLoading = true;
        await deletePost(this.localPost._id);
        this.$emit("post-deleted", this.localPost._id);
      } catch (error) {
        console.error("Errore delete:", error);
      } finally {
        this.isLoading = false;
      }

    },

    async fetchTags(){
      try {
        this.isLoading = true;
        const tags = await getTagsById(this.post.tags) 
        this.tags = tags; 
      } catch (error) {
        console.error("Errore tags:", error);
      } finally {
        this.isLoading = false;
      }

    }
  },
  mounted() {
    this.fetchTags();
  }
};
</script>
