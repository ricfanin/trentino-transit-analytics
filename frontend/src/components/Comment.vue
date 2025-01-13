<template>
    <!-- Commento -->
    <div class="bg-white p-6 border-2 rounded-lg shadow-md">
      <!-- Username -->
      <div class="flex justify-between mb-4">
        <span class="text-text_2 flex items-center"> {{comment.author.name}} </span>
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
          <div class="flex items-center text-text_1">355</div>
          <!-- Downvote -->
          <button
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
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Comment",
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
  };
  </script>
  