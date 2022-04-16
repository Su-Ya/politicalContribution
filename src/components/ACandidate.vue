<script>
export default {
  name: "ACandidate",
};
</script>
<script setup>
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ref, onMounted, shallowRef } from "vue";
import CandidatesInDistricts from "@/components/CandidatesInDistricts.vue";

const props = defineProps({
  candidatesInDistricts: {
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  createPieChart();
});
Chart.register(...registerables);
Chart.register(ChartDataLabels);
const pieCtx = shallowRef();
let pieChart = shallowRef();
function createPieChart() {
  const initPieChartData = shallowRef({
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "總收入和總支出",
        },
        labels: [
          {
            render: "value",
            fontSize: 10,
          },
        ],
      },
    },
  });
  pieCtx.value = document.getElementById("pieChart ");
  pieChart.value = new Chart(pieCtx.value, initPieChartData.value);
}
let selectedCandidate = ref({});
function updatePieChart(value) {
  selectedCandidate.value = value[0];

  pieChart.value.data.labels = ["總收入", "總支出"];
  pieChart.value.data.datasets = [
    {
      backgroundColor: ["#41B883", "#E46651"],
      data: [
        Number(deleteComma(selectedCandidate.value.總收入)),
        Number(deleteComma(selectedCandidate.value.總支出)),
      ],
    },
  ];
  pieChart.value.update();
}
function deleteComma(strPrice) {
  if (strPrice === undefined || strPrice === null) return "";
  return strPrice.split(",").join("");
}

function isElected(mark) {
  switch (mark) {
    case "*":
      return true;
    case "":
    default:
      return false;
  }
}
</script>

<template>
  <section class="a-candidate-container">
    <h2>請選擇ㄧ位檢視</h2>
    <CandidatesInDistricts
      modal="single"
      :candidatesInDistricts="props.candidatesInDistricts"
      @updateSelected="updatePieChart"
    ></CandidatesInDistricts>
    <section>
      <div class="selected-candidate-info">
        <div class="field">
          <label>候選人: </label><span>{{ selectedCandidate.姓名 }}</span>
        </div>
        <div class="field">
          <label>地區: </label><span>{{ selectedCandidate.地區 }}</span>
        </div>
        <div class="field">
          <label>政黨: </label><span>{{ selectedCandidate.推薦政黨 }}</span>
        </div>
        <div class="field">
          <label>當選: </label>
          <img
            class="elected"
            src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Vote1.svg"
            alt="elected icon"
            v-if="isElected(selectedCandidate?.當選註記)"
          />
        </div>
      </div>
      <div>
        <h3>該候選人的營利事業收支細項</h3>
        <div style="max-width: 500px">
          <canvas id="pieChart " height="400"></canvas>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.a-candidate-container {
  .selected-candidate-info {
    margin-top: 3em;
    display: flex;
    flex-wrap: wrap;
    .field {
      * {
        vertical-align: middle;
      }
      .elected {
        width: 20px;
      }
    }
    .field + .field {
      margin-left: 1.5em;
    }
  }
}
</style>
