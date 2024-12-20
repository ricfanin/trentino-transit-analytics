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
        <form>
          <!-- Titolo del Post -->
          <input
            type="text"
            placeholder="Titolo"
            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <!-- Seleziona Linea -->
          <label class="block text-sm font-medium text-gray-400"
            >Seleziona Linea</label
          >
          <select
            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Linea 1 - Stazione FS</option>
            <option>Linea 2 - Stazione FS</option>
            <option>Linea 3 - Stazione FS</option>
            <option>Linea 4 - Stazione FS</option>
            <option>Linea 5 - Stazione FS</option>
          </select>

          <!-- Seleziona Fermata (Opzionale) -->
          <label class="block text-sm font-medium text-gray-400"
            >Seleziona Fermata (Opzionale)</label
          >
          <select
            class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Fermata</option>
            <option>Fermata</option>
            <option>Fermata</option>
            <option>Fermata</option>
          </select>

          <!-- Descrizione del Problema -->
          <textarea
            placeholder="Descrizione del Problema"
            rows="4"
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
