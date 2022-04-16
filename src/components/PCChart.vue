<script>
export default {
  name: "PCChart",
};
</script>
<script setup>
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { onMounted } from "vue";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

const props = defineProps({
  id: {
    type: String,
  },
  config: {
    type: Object,
  },
});
const emits = defineEmits({
  updateChart: () => true,
});

onMounted(() => {
  const cxt = document.getElementById(`${props.id}`);
  const PCChart = new Chart(cxt, props.config);
  emits("updateChart", PCChart);
});
</script>

<template>
  <div style="max-width: 500px">
    <canvas :id="props.id" height="400"></canvas>
  </div>
</template>

<style lang="scss" scoped></style>
