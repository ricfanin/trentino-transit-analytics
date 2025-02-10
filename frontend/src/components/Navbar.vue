<template>
    <nav class="bg-background_2 shadow shadow-background_2 w-100 px-8 md:px-auto">
    <div
      class="h-24 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap"
    >
      <!-- Logo -->
        <div class="text-button_2 md:order-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-14 w-14"
          stroke="white"
        >
          <path
            d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z"
          />
          <path
            d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z"
          />
          <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
        </svg>
      </div>

      <!-- Menu -->
    <div class="text-xl text-text_1 order-3 w-full md:w-auto md:order-2">
        <ul class="flex font-medium justify-between">
            <li class="md:px-4 md:py-2 hover:text-button_2">
                <router-link to="/">Home</router-link>
            </li>
            <li v-if="isLoggedIn" class="md:px-4 md:py-2 hover:text-button_2">
                <router-link to="/Social">Social</router-link>
            </li>
            <li v-if="isAdmin" class="md:px-4 md:py-2 hover:text-button_2">
                <router-link to="/Linea">Linee</router-link>
            </li>
            <li v-if="isAdmin" class="md:px-4 md:py-2 hover:text-button_2">
                <router-link to="/Corsa">Linea</router-link>
            </li>
            <li v-if="isLoggedIn" class="md:px-4 md:py-2 hover:text-button_2">
                <router-link to="/Profilo">Profilo</router-link>
            </li>
        </ul>
      </div>

      <!-- Login/Logout -->
      <div class="order-2 md:order-3 font-medium">
        <template v-if="isLoggedIn">
          <!-- Mostra il nome utente -->
          <span class="px-4 py-2 bg-button_2 text-gray-50 rounded-xl">{{ userName }}</span>
          <button
            @click="logout"
            class="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <!-- Mostra il pulsante Login -->
          <router-link to="/LoginPage">
            <button
              class="px-4 py-2 bg-button_2 hover:bg-green-600 text-gray-50 rounded-xl flex items-center gap-2"
            >
              <!-- Heroicons - Login Solid -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Login
            </button>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import apiClient from "@/services/api";

export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => store.state.isLoggedIn);
    const userName = computed(() => store.state.userName);
    const isAdmin = computed(() => store.state.role === "admin");

    const logout = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        apiClient.post("auth/logout", {
            refreshToken: refreshToken,
        });
        store.dispatch("logout");
        router.push("/");
        window.location.reload();
    };

    return {
      isLoggedIn,
      userName,
      isAdmin,
      logout,
    };
  },
};
</script>
