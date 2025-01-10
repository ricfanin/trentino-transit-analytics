<template>
    <div class="m-10 bg-white rounded-lg">
        <BusLinesDelays />
    </div>
</template>

<script>
import BusLinesDelays from '@/components/BusLinesDelays.vue';

export default {
  name: 'Linea',
  components: {
    BusLinesDelays,
  },
};
</script>
