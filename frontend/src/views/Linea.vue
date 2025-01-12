<template>
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
