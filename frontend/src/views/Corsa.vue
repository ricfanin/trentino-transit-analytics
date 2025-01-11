<template>
    <div class="m-10 bg-white rounded-lg">
        <!-- Select per la scelta della linea -->
        <div class="mb-4">
            <label for="routeSelect" class="font-bold text-gray-600">Seleziona una linea:</label>
            <select
                id="routeSelect"
                v-model="selectedRouteId"
                @change="updateRouteDetails"
                class="border border-gray-300 rounded-md p-2"
            >
                <option value="" disabled>Seleziona una linea</option>
                <option v-for="route in routes" :key="route.routeId" :value="route.routeId">
                    Linea {{ route.routeNumber }}
                </option>
            </select>
        </div>

        <!-- Passa sia routeId che routeNumber -->
        <BusLineDelays :route-id="selectedRouteId" :route-number="selectedRouteNumber" />
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
      selectedRouteId: null, // ID della linea selezionata
      selectedRouteNumber: null, // Numero della linea selezionata
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
    updateRouteDetails() {
      // Trova il routeNumber in base al routeId selezionato
      const selectedRoute = this.routes.find((route) => route.routeId === this.selectedRouteId);
      this.selectedRouteNumber = selectedRoute ? selectedRoute.routeNumber : null;
    },
  },
};
</script>
