<template>
    <div class="m-10 bg-white rounded-lg">
        <!-- Select per la scelta della linea -->
        <div class="mb-4">
            <label for="routeSelect" class="font-bold text-gray-600">Seleziona una linea:</label>
            <select
                id="routeSelect"
                v-model="selectedRoute"
                @change="updateRoute"
                class="border border-gray-300 rounded-md p-2"
            >
                <option value="" disabled>Seleziona una linea</option>
                <option v-for="route in routes" :key="route.routeId" :value="route.routeId">
                    Linea {{ route.routeNumber }}
                </option>
            </select>
        </div>

        <!-- Passa la linea selezionata come prop -->
        <BusLineDelays :route-id="selectedRoute" />
        <BusLineDelaysWithStops />
    </div>
</template>

<script>
import BusLineDelays from '@/components/BusLineDelays.vue';
import BusLineDelaysWithStops from '@/components/BusLineDelaysWithStops.vue';
import apiClient from "@/services/api";

export default {
  name: 'Corsa',
  components: {
    BusLineDelays,
    BusLineDelaysWithStops,
  },
  data() {
    return {
      selectedRoute: null, // Valore selezionato dall'utente (routeId)
      routes: [], // Lista delle route con routeId e routeNumber
    };
  },
  created() {
    this.fetchRoutes();
  },
  methods: {
    async fetchRoutes() {
      try {
        // Chiamata API per ottenere tutte le route disponibili
        const response = await apiClient.get('/linesIdNumbers');
        this.routes = response.data;
      } catch (error) {
        console.error("Errore nel caricamento delle route:", error);
      }
    },
    updateRoute() {
      // Opzionale: log o azioni aggiuntive quando cambia la selezione
      console.log("Route selezionata:", this.selectedRoute);
    },
  },
};
</script>
