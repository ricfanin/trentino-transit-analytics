<template>
    <div>
        <span class="font-bold text-gray-600 text-2xl">Ritardi medi con orari Linea X</span>
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
            { hour: '8:00', avg_delay: 10 },
            { hour: '8:30', avg_delay: 1 },
            { hour: '9:00', avg_delay: 15 },
            { hour: '9:30', avg_delay: 0 },
            { hour: '10:00', avg_delay: 11 },
            { hour: '10:30', avg_delay: 9 },
            { hour: '11:00', avg_delay: 8 },
            { hour: '11:30', avg_delay: 3 },
            { hour: '12:00', avg_delay: 3 },
            { hour: '12:30', avg_delay: 8 },
            { hour: '13:00', avg_delay: 11 },
            { hour: '13:30', avg_delay: 19 },
            { hour: '14:00', avg_delay: 11 },
            { hour: '14:30', avg_delay: 4 },
        ];

        // Estrarre dati per il grafico
        const labels = data.map(item => item.hour);
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
                  text: 'Ore',
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