<template>
    <div>
        <span class="font-bold text-gray-600 text-2xl">
            Ritardi medi con orari Linea {{ routeId }}{{ routeNumber }}
        </span>
        <div class="w-full">
            <canvas class="m-auto" ref="chart"></canvas>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/api";

import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default {
  name: 'BusDelayChart',
  props: {
    routeId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      routeNumber: null, // Per visualizzare il numero della linea
    };
  },
  watch: {
    routeId: {
      immediate: true,
      handler() {
        this.fetchRouteNumber(); // Ottieni il routeNumber
        this.fetchData(); // Ottieni i dati del grafico
      },
    },
  },
  methods: {
    async fetchRouteNumber() {
      if (!this.routeId) return;

      try {
        // Ottieni il routeNumber per il routeId
        const response = await apiClient.get(`/routes/${this.routeId}`);
        this.routeNumber = response.data.routeNumber;
      } catch (error) {
        console.error('Errore nel caricamento del routeNumber:', error);
      }
    },
    async fetchData() {
      if (!this.routeId) return;

      try {
        // Ottieni i dati dal server filtrati per routeId
        const response = await apiClient.get(`trips-average/times?routeId=${this.routeId}`);
        const data = response.data;

        // Estrarre dati per il grafico
        const labels = data.map((item) => item.startTripTime);
        const delays = data.map((item) => item.averageDelay);

        // Configurazione del grafico
        if (this.chart) {
          this.chart.destroy(); // Distruggi il grafico precedente se esiste
        }

        this.chart = new Chart(this.$refs.chart, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Minuti di ritardo medio',
                data: delays,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Minuti di ritardo',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Orari',
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
      }
    },
  },
};
</script>
