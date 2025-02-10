<template>
  <div
    class="max-w-4xl mx-auto mt-10 p-6 bg-white border-2 rounded-lg shadow-md"
  >
    <div class="flex items-center space-x-4">
      <!-- Form Modifica Profilo -->
      <div class="flex-grow">
        <form @submit.prevent="updateProfile" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-text_3">Nome</label>
            <input
              v-model="user.name"
              type="text"
              placeholder="Nome"
              class="mt-1 block w-full border text-text_3 border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text_3">Username</label>
            <input
              v-model="user.username"
              type="text"
              placeholder="Username"
              class="mt-1 block w-full border text-text_3 border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text_3">Cognome</label>
            <input
              v-model="user.surname"
              type="text"
              placeholder="Cognome"
              class="mt-1 block w-full border text-text_3 border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-text_3">Email</label>
            <input
              v-model="user.email"
              type="email"
              placeholder="email@address.com"
              class="mt-1 block w-full border text-text_3 border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div class="col-span-2">
            <button
              type="submit"
              class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium shadow-md"
            >
              Salva Modifiche
            </button>
          </div>
        </form>

        <!-- Messaggi di esito -->
        <p v-if="successMessage" class="text-green-600 mt-2">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api"; // Import API client

export default {
  name: "ModificaProfilo",
  data() {
    return {
      user: {
        name: "",
        username: "",
        surname: "",
        email: "",
      },
      successMessage: "",
      errorMessage: "",
      userId: null, // Per gestire l'ID dell'utente
    };
  },
  methods: {
    async getProfile() {
      try {
        this.userId = localStorage.getItem("user_id"); // Recupera userId dallo storage

        if (!this.userId) {
          this.errorMessage = "User ID non trovato.";
          return;
        }

        const response = await apiClient.get("/user");
        this.user = response.data; // Popola il form con i dati dell'utente
        
      } catch (error) {
        this.errorMessage = "Errore nel caricamento del profilo.";
      }
    },
    async updateProfile() {
      try {
        if (!this.userId) {
          this.errorMessage = "User ID non trovato.";
          return;
        }

        await apiClient.patch(`/user/${this.userId}`, this.user);
        this.successMessage = "Profilo aggiornato con successo!";
        this.errorMessage = "";
      } catch (error) {
        this.successMessage = "";
        this.errorMessage = "Errore durante l'aggiornamento del profilo.";
      }
    },
  },
  created() {
    this.getProfile(); // Carica i dati del profilo quando la pagina viene aperta
  },
};
</script>
