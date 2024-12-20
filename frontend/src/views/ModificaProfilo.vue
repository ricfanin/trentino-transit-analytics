<template>
  <div
    class="max-w-4xl mx-auto mt-10 p-6 bg-white border-2 rounded-lg shadow-md"
  >
    <div class="flex items-center space-x-4">
      <!-- Form Modifica Profilo -->
      <div class="flex-grow">
        <form class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              type="text"
              placeholder="username"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Cognome</label
            >
            <input
              type="text"
              placeholder="Cognome"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="email@address.com"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </form>
        <button
          class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Modifica Profilo
        </button>
        <PostButton />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModificaProfilo",
};
</script>
