<script>
export default {
  name: "PoliticalContribution",
};
</script>

<script setup>
import { useCandidateStore } from "@/stores/candidate";

import PKCandidates from "@/components/PKCandidates.vue";

const candidateStore = useCandidateStore();
</script>

<template>
  <div class="container">
    <h1>2016 年立委候選人政治獻金分析</h1>
    <PKCandidates
      :candidatesInDistricts="candidateStore.candidatesInDistricts"
    ></PKCandidates>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 900px;
  margin: auto;
}
</style>
