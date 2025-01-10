<template>
    <div class="m-10 bg-white rounded-lg">
        <BusLinesDelays />
        <BusLinesDelaysByTimes />
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
