<template>
    <!-- Commento -->
    <div class="bg-white p-6 border-2 rounded-lg shadow-md">
      <!-- Username -->
      <div class="flex justify-between mb-4">
        <span class="text-gray-600 flex items-center"> Username </span>
      </div>
      <!-- Descrizione Commento -->
      <p class="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. 
      </p>
      <!-- Pulsanti Like -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2 bg-blue-400 rounded-3xl">
          <!-- Upvote -->
          <button
            class="flex items-center px-2 py-2 rounded-3xl hover:bg-blue-500"
          >
            <div class="text-gray-100 md:order-1">
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
          <div class="flex items-center text-gray-100">355</div>
          <!-- Downvote -->
          <button
            class="flex items-center px-2 py-2 rounded-3xl hover:bg-blue-500"
          >
            <div class="text-gray-100 md:order-1">
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
  };
  </script>
  