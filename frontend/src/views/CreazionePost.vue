/* eslint-disable */
<template>
  <div class="h-screen">
    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Titolo -->
      <h1 class="text-3xl font-bold text-text_2 text-center mb-8">
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
            <option value="" disabled selected>Seleziona Linea</option>
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
            PUBBLICA
          </button>
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
        console.log(this.form.title, this.form.content, this.form.line);
        const response = await createPost({
          author_id: localStorage.getItem("user_id"),
          title: this.form.title,
          content: this.form.content,
          tags: ["678397e50954c6da2890bc4f"],
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
