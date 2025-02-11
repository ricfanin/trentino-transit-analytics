<template>
    <div class="my-4">
        <span class="font-bold text-text_2 text-2xl">
            Ritardio medio nelle fermate Linea {{ routeNumber }}
        </span>
        <canvas class="m-auto" ref="chart"></canvas>
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
      type: [String, Number, null],
      required: true,
    },
    routeNumber: {
      type: [String, Number, null],
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      isLoading: false,
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
        this.isLoading = true; // Mostra il loading spinner

        // Ottieni i dati dal server filtrati per routeId
        const response = await apiClient.get(`trips-average/stops?routeId=${this.routeId}`);
        const data = response.data;

        this.isLoading = false; // nascondi il loading spinner

        // Estrarre dati per il grafico
        const labels = data.andata.map((item) => item.stopName);
        const delaysAndata = data.andata.map((item) => item.averageDelay);
        const delaysRitorno = data.ritorno.map((item) => item.averageDelay);

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
                label: 'ritardo andata [min]',
                data: delaysAndata,
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
                borderRadius: 5,
              },
              {
                label: 'ritardo ritorno [min]',
                data: delaysRitorno,
                backgroundColor: '#60a5fa99',
                borderColor: '#60a5fa',
                borderWidth: 2,
                borderRadius: 5,
              },
            ],
          },
          options: {
            animation: { duration: 0 },
            responsive: true,
            maintainAspectRatio: true,
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
                  text: 'Fermate',
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
