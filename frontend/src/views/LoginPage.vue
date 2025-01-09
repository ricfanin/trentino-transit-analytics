<template>
  <div>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2
          class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center"
        >
          Accedi al tuo Account
        </h2>

        <!-- Messaggio di errore -->
        <div
          v-if="errorMessage"
          class="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="flex flex-col mb-6">
            <label for="email" class="text-sm font-medium text-gray-600 mb-1"
              >Email</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
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

          <!-- Password -->
          <div class="flex flex-col mb-4">
            <label for="password" class="text-sm font-medium text-gray-600 mb-1"
              >Password</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
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

          <!-- Pulsante Login -->
            <button
              type="submit"
              class="w-full px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
            >
              Accedi
            </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-500">
          Non hai un account?
          <span class="text-blue-500 hover:underline">
            <router-link to="/RegisterPage">Registrati</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api";
import { errorMessages } from "vue/compiler-sfc";

export default {
  name: "LoginPagePage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try{
        const response = await apiClient.post("auth/login", {
          email: this.email,
          password: this.password,
        });
        this.errorMessage = "";
  
        // Memorizza i token e redirigi l'utente
        const { user, tokens } = response.data;
        localStorage.setItem("accessToken", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);
        this.$router.push("Profilo");
      } catch(error){
        this.errorMessage = error.response?.data?.message || "Errore di login. Riprova.";
      }
    },
  },
};
</script>
