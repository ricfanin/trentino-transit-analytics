<template>
  <div>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h2
          class="text-2xl sm:text-3xl font-semibold text-text_2 mb-8 text-center"
        >
          Crea il tuo Account
        </h2>

        <!-- Messaggio di errore -->
        <div
          v-if="errorMessage"
          class="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Username -->
          <div class="flex flex-col">
            <label for="username" class="text-sm font-medium text-text_3 mb-1"
              >Username</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:button_1_hover"
            >
              <input
                id="username"
                type="text"
                v-model="username"
                class="flex-1 px-3 py-2 bg-transparent outline-none"
                placeholder="username"
              />
            </div>
          </div>

          <!-- Seleziona Ruolo -->
          <div class="flex flex-col">
            <label for="role" class="text-sm font-medium text-text_3 mb-1"
              >Seleziona Ruolo</label
            >
            <select
              id="role"
              class="border rounded-lg px-3 py-2 text-text_3 bg-gray-50 focus:ring-2 focus:button_1_hover outline-none"
            >
              <option value="Utente">Utente</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <label for="email" class="text-sm font-medium text-text_3 mb-1"
              >Email</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:button_1_hover"
            >
              <input
                id="email"
                type="email"
                v-model="email"
                class="flex-1 px-3 py-2 bg-transparent outline-none"
                placeholder="email@address.com"
              />
            </div>
          </div>

          <!-- Nome -->
          <div class="flex flex-col">
            <label for="nome" class="text-sm font-medium text-text_3 mb-1"
              >Nome</label
            >
            <input
              id="nome"
              type="text"
              class="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:button_1_hover outline-none"
              placeholder="Nome"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label for="password" class="text-sm font-medium text-text_3 mb-1"
              >Password</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:button_1_hover"
            >
              <input
                id="password"
                type="password"
                v-model="password"
                class="flex-1 px-3 py-2 bg-transparent outline-none"
                placeholder="********"
              />
            </div>
          </div>

          <!-- Cognome -->
          <div class="flex flex-col">
            <label for="cognome" class="text-sm font-medium text-text_3 mb-1"
              >Cognome</label
            >
            <input
              id="cognome"
              type="text"
              class="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:button_1_hover outline-none"
              placeholder="Cognome"
            />
          </div>

          <!-- Immagine Profilo 
          <div class="flex flex-col items-center">
            <label class="text-sm font-medium text-text_3 mb-1"
              >Immagine Profilo</label
            >
            <div
              class="border rounded-lg bg-gray-50 w-32 h-32 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v4m0 0v4m-4-4h8"
                />
              </svg>
            </div>
            <button
              type="button"
              class="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-text_3"
            >
              Seleziona Immagine
            </button>
          </div> -->
          
          <!-- Bottoni -->
          <div class="mt-8 text-center">
              <button
              class="w-full px-6 py-3 bg-button_2 text-text_1 font-medium rounded-lg hover:bg-button_2_hover"
              type="submit"
              >
              Registrati
            </button>
          </div>
      </form>

        <div class="mt-4 text-center text-sm text-text_3">
          Hai già un account?
          <span href="#" class="text-button_1_hover hover:underline"
            ><router-link to="/LoginPage">Accedi qui</router-link></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/api';
export default {
  name: "RegisterPage",

  data(){
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: ""
    };
  },

  methods: {
    async handleRegister() {
    try {
        const response = await apiClient.post("auth/register", {
          name: this.username,
          email: this.email,
          password: this.password,
        });

        // Se la richiesta ha successo, resetta gli errori e continua
        this.errorMessage = "";

        // Memorizza i token e redirigi l'utente
        const { user, tokens } = response.data;
        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);
        this.$router.push("Profilo");
      } catch (error) {
        // Gestione errore: aggiorna il messaggio da mostrare
        this.errorMessage =
          error.response?.data?.message || "Errore durante la registrazione. Riprova.";
      }
    },
  }
};
</script>
