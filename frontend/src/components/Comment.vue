<template>
    <!-- Commento -->
    <div class="bg-white p-6 border-2 rounded-lg shadow-md">
      <!-- Username -->
      <div class="flex justify-between mb-4">
        <span class="text-text_2 flex items-center"> {{comment.author.username}} </span>
      </div>
      <!-- Descrizione Commento -->
      <p class="text-text_2 mb-4">
       {{ comment.content }}
      </p>
      <!-- Pulsanti Like -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2 bg-button_1_hover rounded-3xl">
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
        <button 
            v-if="isAdmin || isAuthor"
            @click="deleteComment"
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
  </template>
  
<script>
    import { updatePostVote } from '@/services/posts';
    import { deleteComment } from '@/services/commets';

    export default {
      name: "Comment",
      props: {
          comment: {
              type: Object,
              required: true,
          },
      },
      data(){
        return {
          isAdmin: localStorage.getItem("user_role") === "admin",
          isAuthor: localStorage.getItem("user_id") === this.comment.author._id,
        }
      },
      computed: {
        netScore() {
          return this.comment.upvote - this.comment.downvote;
        },
      },
      methods: {
        async vote(type) {
              try {
                const updatedComment = await updatePostVote(
                  this.comment._id,
                  localStorage.getItem("user_id"),
                  type,
                  true
                );
                this.comment.upvote = updatedComment.upvote;
                this.comment.downvote = updatedComment.downvote;

                this.$emit("update-comment", updatedComment);
          } catch (error) {
            console.error("Errore durante l'aggiornamento del voto:", error);
          }
        },
    
        async deleteComment() {
          try {
            await deleteComment(this.comment._id);
            this.$emit("comment-deleted", this.comment._id); 
          } catch (error) {
            console.error("Errore delete:", error);
          }
        },
    },
  };
</script>
  