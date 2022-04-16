<script>
export default {
  name: "CandidatesInDistricts",
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

const emits = defineEmits({
  updateSelectedCandidates: () => true,
});
let selectedCandidates = ref([]);
const selectedCandidateNames = computed(() =>
  selectedCandidates.value.map((item) => item.姓名)
);
function selectedCandidate(candidate) {
  const maxSelected = 2;
  if (selectedCandidates.value.length === maxSelected) {
    selectedCandidates.value = [candidate];
    emits("updateSelectedCandidates", selectedCandidates.value);
    return;
  }
  if (
    candidate.姓名 === selectedCandidates.value[0]?.姓名 &&
    candidate.地區 === selectedCandidates.value[0]?.地區
  )
    return;
  selectedCandidates.value = [...selectedCandidates.value, candidate];
  emits("updateSelectedCandidates", selectedCandidates.value);
}
</script>

<template>
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
</template>

<style lang="scss" scoped>
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
</style>
