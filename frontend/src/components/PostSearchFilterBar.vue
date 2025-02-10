<template>
  <!-- Barra Ricerca -->
  <div class="flex justify-between items-center mb-1">
    <!-- Selezioni sulla sinistra -->
    <div class="flex space-x-4 items-center">
      <!-- Prima Selection (Linea) -->
      <select v-model="selectedLine" @change="onFilterChange" class="px-4 py-2 border-2 rounded-md">
        <option value="">Nessun Filtro</option>
        <option v-for="line in lines" :key="line._id" :value="line._id">
          {{ line.routeNumber }}
        </option>
      </select>

      <!-- Selezione Ordinamento -->
      <select v-model="selectedOrder" @change="onFilterChange" class="px-4 py-2 border-2 rounded-md">
        <option value="upvote">Più votati</option>
        <option value="downvote">Meno votati</option>
        <option value="newest">Più recenti</option>
        <option value="oldest">Più vecchi</option>
      </select>
    </div>

    <!-- Bottone Crea Post a destra -->
    <div class="ml-4 mb-3">
      <PostButton />
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/PostButton.vue";
import { getAllTags } from "@/services/tags";

export default {
  name: "PostSearchFilterBar",
  components: {
    PostButton,
  },
  data() {
    return {
      lines: [],
      selectedLine: "",
      selectedOrder: "upvote",
    };
  },
  methods: {
    onFilterChange() {
      // Emessi sia l'ordine che la linea selezionata
      this.$emit("filterChanged", {
        order: this.selectedOrder,
        line: [this.selectedLine],
      });
    },

    async fetchTags() {
      const response = await getAllTags();
      this.lines = response;
    },
  },
  mounted() {
    this.fetchTags();
  },
};
</script>
