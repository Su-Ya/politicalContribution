<script>
export default {
  name: "PKCandidates",
};
</script>

<script setup>
import { ref, shallowRef, computed } from "vue";
import CandidatesInDistricts from "@/components/CandidatesInDistricts.vue";
import PCChart from "@/components/PCChart.vue";

const props = defineProps({
  candidatesInDistricts: {
    type: Array,
    default: () => [],
  },
});

let selectedCandidates = ref([]);

function isElected(mark) {
  switch (mark) {
    case "*":
      return true;
    case "":
    default:
      return false;
  }
}

function formatComma(price) {
  if (price === undefined || price === null) return "";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function deleteComma(strPrice) {
  if (strPrice === undefined || strPrice === null) return "";
  return strPrice.split(",").join("");
}

const barChart = shallowRef();
const initBarChartConfig = computed(() => {
  const canPK = selectedCandidates.value.length === 2;
  if (canPK) {
    const labels = [
      "總收入",
      "個人捐贈收入",
      "營利事業捐贈收入",
      "政黨捐贈收入",
      "人民團體捐贈收入",
      "匿名捐贈收入",
      "其他收入",
    ];
    const color = ["#41B883", "#E46651"];
    const datasets = selectedCandidates.value.map((candidate, index) => {
      const data = labels.map((label) => Number(deleteComma(candidate[label])));
      return {
        label: candidate.姓名,
        data: data,
        backgroundColor: color[index],
        borderColor: color[index],
      };
    });
    return {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
    };
  } else {
    return null;
  }
});
</script>

<template>
  <section class="pk-container">
    <h2>請選擇兩位來 PK</h2>
    <CandidatesInDistricts
      modal="pk"
      :candidatesInDistricts="props.candidatesInDistricts"
      @updateSelected="selectedCandidates = $event"
    ></CandidatesInDistricts>
    <section class="selected-candidates">
      <div class="field">
        <div>{{ selectedCandidates[0]?.姓名 }}</div>
        <div>vs.</div>
        <div>{{ selectedCandidates[1]?.姓名 }}</div>
      </div>
      <div class="field">
        <div>{{ selectedCandidates[0]?.地區 }}</div>
        <div>地區</div>
        <div>{{ selectedCandidates[1]?.地區 }}</div>
      </div>
      <div class="field">
        <div>{{ selectedCandidates[0]?.推薦政黨 }}</div>
        <div>政黨</div>
        <div>{{ selectedCandidates[1]?.推薦政黨 }}</div>
      </div>
      <div class="field">
        <div>
          <img
            class="elected"
            src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Vote1.svg"
            alt="elected icon"
            v-if="isElected(selectedCandidates[0]?.當選註記)"
          />
          <div v-else></div>
        </div>
        <div>當選</div>
        <div>
          <img
            class="elected"
            src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Vote1.svg"
            alt="elected icon"
            v-if="isElected(selectedCandidates[1]?.當選註記)"
          />
          <div v-else></div>
        </div>
      </div>
      <div class="field">
        <div>{{ selectedCandidates[0]?.捐贈企業數 }}</div>
        <div>捐贈企業數</div>
        <div>{{ selectedCandidates[1]?.捐贈企業數 }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.總收入) }}</div>
        <div>總收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.總收入) }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.個人捐贈收入) }}</div>
        <div>個人捐贈收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.個人捐贈收入) }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.營利事業捐贈收入) }}</div>
        <div>營利事業捐贈收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.營利事業捐贈收入) }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.政黨捐贈收入) }}</div>
        <div>政黨捐贈收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.政黨捐贈收入) }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.人民團體捐贈收入) }}</div>
        <div>人民團體捐贈收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.人民團體捐贈收入) }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.匿名捐贈收入) }}</div>
        <div>匿名捐贈收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.匿名捐贈收入) }}</div>
      </div>
      <div class="field">
        <div>{{ formatComma(selectedCandidates[0]?.其他收入) }}</div>
        <div>其他收入</div>
        <div>{{ formatComma(selectedCandidates[1]?.其他收入) }}</div>
      </div>
    </section>
    <section class="charts">
      <PCChart
        v-if="initBarChartConfig"
        id="barChart"
        :config="initBarChartConfig"
        @updateChart="barChart = $event"
      ></PCChart>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.selected-candidates {
  margin-top: 3em;
  .field {
    display: flex;
    text-align: center;
    * {
      flex: 1 0 0;
    }
  }
  .field {
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #ccc;
  }

  .elected {
    width: 20px;
  }
}
</style>
