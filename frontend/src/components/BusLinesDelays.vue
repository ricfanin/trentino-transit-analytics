<template>
    <div>
        <span class="font-bold text-gray-600 text-2xl">Ritardi medi delle linee bus</span>
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
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Ottieni i dati dal server
        const response = await apiClient.get('trips-average/lines');
        const data = response.data;

        // Estrarre dati per il grafico
        const labels = data.map(item => `Linea ${item.routeId}`);
        const delays = data.map(item => item.averageDelay);

        // Configurazione del grafico
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
            indexAxis: 'y', // Cambia l'asse per avere le barre orizzontali
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
                  text: 'Linee',
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

<style>
canvas{
  width: 100%;
}

</style>