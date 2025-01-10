<template>
    <div class="m-10 bg-white rounded-lg">
        <BusLineDelays />
        <BusLineDelaysWithStops />
    </div>
</template>

<script>
import BusLineDelays from '@/components/BusLineDelays.vue';
import BusLineDelaysWithStops from '@/components/BusLineDelaysWithStops.vue';

export default {
  name: 'Corsa',
  components: {
    BusLineDelays,
    BusLineDelaysWithStops
  },
};
</script>