/* eslint-disable */
<template>
  <div class="h-screen">
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Titolo -->
      <h1 class="text-3xl font-bold text-text_2 text-center mb-8">
        Scrivi la tua opinione
      </h1>

      <!-- Messaggio di errore -->
      <div
        v-if="errorMessage"
        class="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg"
      >
        {{ errorMessage }}
      </div>
      
      <!-- Form -->
      <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border">
        <form @submit.prevent="submitForm">
          <!-- Titolo del Post -->
          <input
            type="text"
            placeholder="Titolo"
            v-model="form.title" 
            required 
            class="w-full mb-4 px-4 py-2 border text-text_3 rounded-md focus:outline-none focus:ring-2"
          />

          <!-- Seleziona Linea -->
          <label class="block text-sm font-medium text-text_3"
            >Seleziona Linea</label
          >
		      <select
            v-model="form.line" 
            class="w-full mb-4 px-4 py-2 border text-text_3 rounded-md focus:outline-none focus:ring-2"
            required
          >
            <option value="" disabled>Seleziona Linea</option>
            
            <option v-for="line in lines" :key="line._id" :value="line._id">
              {{ line.routeNumber }}
            </option>
          </select>

          <!-- Seleziona Fermata (Opzionale) -->
          <!-- <label class="block text-sm font-medium text-text_3"
            >Seleziona Fermata (Opzionale)</label
          > -->


          <!-- Descrizione del Problema -->
          <textarea
            placeholder="Descrizione del Problema"
            rows="4"
            v-model="form.content" 
            required
            class="w-full mb-4 px-4 py-2 border text-text_3 rounded-md focus:outline-none focus:ring-2"
          ></textarea>

          <!-- Pulsante Pubblica -->
          <button
            type="submit"
            class="w-full bg-button_2 text-text_1 py-2 rounded-md hover:bg-button_2_hover"
          >
            Pubblica
          </button>

            <!-- Loading Spinner -->
            <div v-show="isLoading" class="pt-2 flex justify-center w-full" role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createPost } from "@/services/posts";
import { getAllTags } from "@/services/tags";

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        line: '',
      },
      lines: [],
      isLoading: false,
      errorMessage: "",
    };
  },
	methods: {
    async fetchTags() {
      const response = await getAllTags();
      this.lines = response
    },

    async submitForm() {
      try {
        this.isLoading = true; // Mostra il loading spinner
        const response = await createPost({
          author_id: localStorage.getItem("user_id"),
          title: this.form.title,
          content: this.form.content,
          tags: [this.form.line],
        });

        this.errorMessage = ""; // Resetta il messaggio di errore`
        this.isLoading = false; // Nascondi il loading spinner
        this.$router.push({ path: '/Profilo' });

        this.form.title = '';
        this.form.content = '';
        this.form.line
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Errore nella creazione del post. Riprova.";
      }
    },
  },
  mounted() {
    this.fetchTags();
  }
};
</script>
