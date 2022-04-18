<script>
export default {
  name: "ACandidate",
};
</script>
<script setup>
import { ref, shallowRef, computed } from "vue";
import CandidatesInDistricts from "@/components/CandidatesInDistricts.vue";
import PCChart from "@/components/PCChart.vue";
import { useCandidateStore } from "@/stores/candidate";
import Utils from "@/utils/utils.js";

const props = defineProps({
  candidatesInDistricts: {
    type: Array,
    default: () => [],
  },
});

let selectedCandidate = ref({});
function updateSelected(value) {
  selectedCandidate.value = value[0];
  updatePieChart();
  updateLineChart();
}

let pieChart = shallowRef();
const initPieChartConfig = shallowRef({
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
    maintainAspectRatio: false,
  },
});
function updatePieChart() {
  pieChart.value.data.labels = ["總收入", "總支出"];
  pieChart.value.data.datasets = [
    {
      backgroundColor: ["#41B883", "#E46651"],
      data: [
        Number(Utils.deleteComma(selectedCandidate.value.總收入)),
        Number(Utils.deleteComma(selectedCandidate.value.總支出)),
      ],
    },
  ];
  pieChart.value.update();
}
const initLineChartConfig = shallowRef({
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "捐贈公司",
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        data: [],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "捐贈公司和營利事業收入",
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
let lineChart = shallowRef();
function updateLineChart() {
  lineChart.value.data.labels = [...contributor.value.companies];
  lineChart.value.data.datasets = [
    {
      ...lineChart.value.data.datasets[0],
      data: [...contributor.value.prices],
    },
  ];
  lineChart.value.update();
}
const candidateStore = useCandidateStore();
const candidate = computed(() => {
  if (!selectedCandidate.value) return {};
  return candidateStore.getACandidateForProfitDonationsIncome({
    candidate: selectedCandidate.value.姓名,
    politicalParty: selectedCandidate.value.推薦政黨,
  });
});
const contributor = computed(() => {
  if (candidate.value.length > 0) {
    const companies = candidate.value.map((item) => item["捐贈者／支出對象"]);
    const prices = candidate.value.map((item) =>
      Number(Utils.deleteComma(item["收入金額"]))
    );
    console.log(companies);
    console.log(prices);
    return {
      companies,
      prices,
    };
  } else {
    return {};
  }
});
</script>

<template>
  <section class="a-candidate-container">
    <h2>請選擇ㄧ位來檢視</h2>
    <CandidatesInDistricts
      modal="single"
      :candidatesInDistricts="props.candidatesInDistricts"
      @updateSelected="updateSelected"
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
            v-if="Utils.isElected(selectedCandidate?.當選註記)"
          />
        </div>
      </div>
      <div>
        <h3>細項</h3>
        <PCChart
          id="pieChart"
          :config="initPieChartConfig"
          @updateChart="pieChart = $event"
        ></PCChart>
        <PCChart
          id="lineChart"
          :config="initLineChartConfig"
          @updateChart="lineChart = $event"
        ></PCChart>
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
