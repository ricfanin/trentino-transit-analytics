<template>
    <div>
        <span class="font-bold text-gray-600 text-2xl">
            Ritardi medi con orari Linea {{ routeNumber }}
        </span>
        <div class="w-full">
            <canvas class="m-auto" ref="chart"></canvas>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/api";

import { Chart, CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend);

export default {
  name: 'BusDelayChart',
  props: {
    routeId: {
      type: [String, Number],
      required: true,
    },
    routeNumber: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    routeId: {
      immediate: true,
      handler() {
          this.fetchData(); // Ottieni i dati del grafico
      },
    },
  },
  methods: {
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
                label: 'ritardo medio [min]',
                data: delays,
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
                borderRadius: 5,
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
