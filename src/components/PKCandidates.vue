<script>
export default {
  name: "PKCandidates",
};
</script>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  candidatesInDistricts: {
    type: Array,
    default: () => [],
  },
});

let selectedCandidates = ref([]);
const selectedCandidateNames = computed(() =>
  selectedCandidates.value.map((item) => item.姓名)
);
function selectedCandidate(candidate) {
  const maxSelected = 2;
  if (selectedCandidates.value.length === maxSelected) {
    selectedCandidates.value = [candidate];
    return;
  }
  if (
    candidate.姓名 === selectedCandidates.value[0]?.姓名 &&
    candidate.地區 === selectedCandidates.value[0]?.地區
  )
    return;
  selectedCandidates.value = [...selectedCandidates.value, candidate];
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

function formatComma(price) {
  if (price === undefined || price === null) return "";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>

<template>
  <section class="pk-container">
    <h2>請選擇兩位來 PK</h2>
    <section class="districts">
      <div
        class="district"
        v-for="(district, index) in props.candidatesInDistricts"
        :key="index"
      >
        <h3 class="name">{{ district[0].地區 }}</h3>
        <div class="candidate">
          <span
            class="name"
            :class="{ active: selectedCandidateNames.includes(candidate.姓名) }"
            v-for="(candidate, index) in district"
            :key="index"
            @click="selectedCandidate(candidate)"
          >
            {{ candidate.姓名 }}
          </span>
        </div>
      </div>
    </section>
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
  </section>
</template>

<style lang="scss" scoped>
.pk-container {
  padding: 0 0.5rem;
}
.districts {
  height: 11.9em;
  overflow-y: auto;
}
.district {
  > .name {
    margin: 0;
    width: fit-content;
    background-color: #666;
    color: #fff;
    padding: 0.2em 0.5em;
    border-radius: 8px;
  }
  .candidate {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .name {
      flex: 0 0 auto;
      padding: 0.4em 0.6em;
      margin: 0.4em;
    }
    .name.active {
      outline: 1px solid red;
      border-radius: 8px;
    }
  }
}
.district + .district {
  margin-top: 1.2em;
}

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
