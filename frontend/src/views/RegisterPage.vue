<template>
  <div>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h2
          class="text-2xl sm:text-3xl font-medium text-text_2 mb-8 text-center"
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
              v-model="ruolo"
              class="border rounded-lg px-3 py-2 text-text_3 bg-gray-50 focus:ring-2 focus:button_1_hover outline-none"
            >
              <option value="user">Utente</option>
              <option value="admin">Admin</option>
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
              v-model="nome"
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
              v-model="cognome"
              class="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:button_1_hover outline-none"
              placeholder="Cognome"
            />
          </div>

          <!-- Bottoni -->
          <div class="mt-8 text-center">
              <button
              class="w-full px-6 py-3 bg-button_2 text-text_1 font-medium rounded-lg hover:bg-button_2_hover"
              type="submit"
              >
              Registrati
            </button>
            <div v-show="isLoading" class="pt-2 flex justify-center w-full" role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
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
      nome: "",
      cognome: "",
      ruolo: "Utente",
      errorMessage: "",
      isLoading: false
    };
  },

  methods: {
    async handleRegister() {
    try {
      this.isLoading = true; // mostra spinner loading
      const response = await apiClient.post("auth/register", {
        username: this.username,
        email: this.email,
        password: this.password,
        name: this.nome,
        surname: this.cognome,
          role: this.ruolo
        });
        this.isLoading = false; // togli spinner loading

        // Se la richiesta ha successo, resetta gli errori e continua
        this.errorMessage = "";

        // Memorizza i token e redirigi l'utente
        const { user, tokens } = response.data;

        localStorage.setItem("user_id", user._id);
        localStorage.setItem("user_name", user.name);

        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);

        this.$store.dispatch("login", { name: user.name, role: user.role });

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
