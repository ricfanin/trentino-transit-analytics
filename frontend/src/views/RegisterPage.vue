<template>
  <div>
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h2
          class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center"
        >
          Crea il tuo Account
        </h2>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Username -->
          <div class="flex flex-col">
            <label for="username" class="text-sm font-medium text-gray-600 mb-1"
              >Username</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                id="username"
                type="text"
                class="flex-1 px-3 py-2 bg-transparent outline-none"
                placeholder="username"
              />
            </div>
          </div>

          <!-- Seleziona Ruolo -->
          <div class="flex flex-col">
            <label for="role" class="text-sm font-medium text-gray-600 mb-1"
              >Seleziona Ruolo</label
            >
            <select
              id="role"
              class="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Utente">Utente</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <label for="email" class="text-sm font-medium text-gray-600 mb-1"
              >Email</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                id="email"
                type="email"
                class="flex-1 px-3 py-2 bg-transparent outline-none"
                placeholder="email@address.com"
              />
            </div>
          </div>

          <!-- Nome -->
          <div class="flex flex-col">
            <label for="nome" class="text-sm font-medium text-gray-600 mb-1"
              >Nome</label
            >
            <input
              id="nome"
              type="text"
              class="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nome"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label for="password" class="text-sm font-medium text-gray-600 mb-1"
              >Password</label
            >
            <div
              class="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                id="password"
                type="password"
                class="flex-1 px-3 py-2 bg-transparent outline-none"
                placeholder="********"
              />
            </div>
          </div>

          <!-- Cognome -->
          <div class="flex flex-col">
            <label for="cognome" class="text-sm font-medium text-gray-600 mb-1"
              >Cognome</label
            >
            <input
              id="cognome"
              type="text"
              class="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Cognome"
            />
          </div>

          <!-- Immagine Profilo 
          <div class="flex flex-col items-center">
            <label class="text-sm font-medium text-gray-600 mb-1"
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
              class="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
            >
              Seleziona Immagine
            </button>
          </div> -->
        </form>

        <!-- Bottoni -->
        <div class="mt-8 text-center">
          <router-link to="/Profilo">
            <button
              class="w-full px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
            >
              Registrati
            </button>
          </router-link>
          <div class="my-4 text-sm text-gray-500">Oppure</div>
          <router-link to="/Profilo">
            <button
              class="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Continua con Google
            </button>
          </router-link>
        </div>

        <div class="mt-4 text-center text-sm text-gray-500">
          Hai già un account?
          <span href="#" class="text-blue-500 hover:underline"
            ><router-link to="/LoginPage">Accedi qui</router-link></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
};
</script>
