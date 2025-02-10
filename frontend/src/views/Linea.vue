<template>

    <div class="text-lg m-6 p-4 text-teal-700 bg-teal-100 border-2 border-teal-300 rounded-lg shadow-md">
      📡 Tutti i dati visualizzati in questa pagina provengono direttamente dalle API di Trentino Trasporti (dal 12/01/2025). <br> 
      🚀 In futuro, raccogliendo più dati, potremo aggiungere nuove funzionalità!
    </div>

    <div class="font-sans py-4 lg:px-24 md:px-8 m-6 bg-white rounded-lg">
      <BusLinesDelaysByTimes />
      <BusLinesDelays />
    </div>
</template>

<script>
import BusLinesDelays from '@/components/BusLinesDelays.vue';
import BusLinesDelaysByTimes from '@/components/BusLinesDelaysByTimes.vue';

export default {
  name: 'Linea',
  components: {
    BusLinesDelays,
    BusLinesDelaysByTimes,
  },
};
</script>
