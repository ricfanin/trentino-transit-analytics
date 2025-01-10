<template>
    <div>
        <span class="font-bold text-gray-600 text-2xl">Ritardi medi delle linee bus</span>
        <div class="w-full">
            <canvas class="m-auto" ref="chart"></canvas>
        </div>
  </div>
</template>

<script>
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarController);
Chart.register(BarElement);

import axios from 'axios';

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
        // const response = await axios.get('http://localhost:3000/api/delays');
        // const data = response.data;

        const data = [
            { line: 1, avg_delay: 10 },
            { line: 2, avg_delay: 5 },
            { line: 3, avg_delay: 15 },
            { line: 4, avg_delay: 7 },
        ];

        // Estrarre dati per il grafico
        const labels = data.map(item => `Linea ${item.line}`);
        const delays = data.map(item => item.avg_delay);

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
    },
  },
};
</script>

<style>
canvas{
  width: 100%;
}

</style>