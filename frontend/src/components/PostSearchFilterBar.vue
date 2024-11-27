<template>
  <!-- Barra Ricerca -->
  <div class="flex justify-between items-center mb-6">
    <input
      type="text"
      placeholder="Cerca un argomento"
      class="w-full max-w-md px-4 py-2 border-2 rounded-full focus:outline-none"
    />
    <div class="space-x-4">
      <!-- Filtra per -->
      <select class="ml-4 px-4 py-2 border-2 rounded-md">
        <option value="trend">Tendenza</option>
        <option value="trend">Più votati</option>
        <option value="trend">Più recenti</option>
        <option value="trend">Più vecchi</option>
      </select>
      <!-- Crea Post -->
      <PostButton />
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/PostButton.vue";

export default {
  name: "PostSearchFilterBar",
  components: {
    PostButton,
  }
};
</script>
