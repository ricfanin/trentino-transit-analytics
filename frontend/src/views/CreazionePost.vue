/* eslint-disable */
<template>
  <div class="h-screen">
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Titolo -->
      <h1 class="text-3xl font-bold text-gray-50 text-center mb-8">
        Scrivi la tua opinione
      </h1>

      <!-- Form -->
      <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border">
        <form @submit.prevent="submitForm">
          <!-- Titolo del Post -->
          <input
            type="text"
            placeholder="Titolo"
            v-model="form.title" 
            required 
            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <!-- Seleziona Linea -->
          <label class="block text-sm font-medium text-gray-400"
            >Seleziona Linea</label
          >
          <select
            id="line-select"
            v-model="form.line"
            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>Seleziona Linea</option>
            <option v-for="line in lines" :key="line._id" :value="line._id">
              {{ line.name }}
            </option>
          </select>

          <!-- Seleziona Fermata (Opzionale) -->
          <label class="block text-sm font-medium text-gray-400"
            >Seleziona Fermata (Opzionale)</label
          >


          <!-- Descrizione del Problema -->
          <textarea
            placeholder="Descrizione del Problema"
            rows="4"
            v-model="form.content" 
            required
            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <!-- Pulsante Pubblica -->
          <button
            type="submit"
            class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700"
          >
            PUBBLICA
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.custom-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

<script>
import { createPost } from "@/services/posts";
import { getAllTags } from "@/services/tags";

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        line: [],
      },
      lines: [],
    };
  },
  methods: {
    async fetchTags() {
      const response = await getAllTags();
      console.log(response);
      this.lines = response
    },

    async submitForm() {
      try {
        
        const response = await createPost({
          author_id: localStorage.getItem("user_id"),
          title: this.form.title,
          content: this.form.content,
          tags: [this.form.line],
        });

        alert('Post creato con successo!');

        this.form.title = '';
        this.form.content = '';
      } catch (error) {
        console.error('Errore durante la creazione del post:', error);
        alert('Errore nella creazione del post.');
      }
    },
  },
  mounted() {
    this.fetchTags();
  }
};
</script>
