<template>
    <div class="m-10 bg-white rounded-lg">
        <BusLinesDelays />
        <BusLineDelays />
        <BusLineDelaysWithStops />
    </div>
</template>

<script>
import BusLineDelays from '@/components/BusLineDelays.vue';
import BusLineDelaysWithStops from '@/components/BusLineDelaysWithStops.vue';
import BusLinesDelays from '@/components/BusLinesDelays.vue';

export default {
  name: 'Linea',
  components: {
    BusLinesDelays,
    BusLineDelays,
    BusLineDelaysWithStops
  },
};
</script>
