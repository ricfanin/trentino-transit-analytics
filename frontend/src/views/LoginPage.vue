<template>
  <div>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2
          class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center"
        >
          Accedi al tuo Account
        </h2>
        <form>
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
            <router-link to="/Profilo">Accedi</router-link>
          </button>

          <div class="my-4 text-center text-sm text-gray-500">Oppure</div>

          <!-- Login con Google -->
          <button
            type="button"
            class="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <router-link to="/Profilo">Accedi con Google</router-link>
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
export default {
  name: "LoginPagePage",
};
</script>
