<template>
    <div>
        <span class="font-bold text-gray-600 text-2xl">Ritardi medi con fermate Linea X</span>
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
            { stop: 'fermata1', avg_delay: 10 },
            { stop: 'fermata2', avg_delay: 14 },
            { stop: 'fermata3', avg_delay: 10 },
            { stop: 'fermata4', avg_delay: 9 },
            { stop: 'fermata5', avg_delay: 3 },
            { stop: 'fermata6', avg_delay: 14 },
        ];

        // Estrarre dati per il grafico
        const labels = data.map(item => item.stop);
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
                  text: 'fermate',
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