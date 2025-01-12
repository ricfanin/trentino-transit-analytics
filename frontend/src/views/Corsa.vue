<template>
    <div class="font-sans m-6 bg-white rounded-lg">
        <!-- Select per la scelta della linea -->
        <div class="p-4">
            <label for="routeSelect" class="text-lg mr-4 font-bold text-gray-600">Seleziona una linea:</label>
            <select
                id="routeSelect"
                v-model="selectedRouteId"
                @change="updateRouteDetails"
                class="font-sans shadow-lg border border-gray-0 rounded-md p-2"
            >
                <option v-for="route in routes" :key="route.routeId" :value="route.routeId" :selected="route.routeId === selectedRouteId">
                    Linea {{ route.routeNumber }}
                </option>
            </select>
        </div>

        <div class="mt-4">
          <BusLineDelays :route-id="selectedRouteId" :route-number="selectedRouteNumber" />
          <BusLineDelaysWithStops :route-id="selectedRouteId" :route-number="selectedRouteNumber" />
        </div>
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
        this.selectedRouteId = this.routes[0].routeId;
        this.selectedRouteNumber = this.routes[0].routeNumber;
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
