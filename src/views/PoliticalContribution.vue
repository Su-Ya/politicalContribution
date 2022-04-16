<script>
export default {
  name: "PoliticalContribution",
};
</script>

<script setup>
import { useCandidateStore } from "@/stores/candidate";
import { ref } from "vue";
import PKCandidates from "@/components/PKCandidates.vue";
import ACandidate from "@/components/ACandidate.vue";
const candidateStore = useCandidateStore();

let modal = ref();
</script>

<template>
  <div class="container">
    <h1>2016 年立委候選人政治獻金分析</h1>
    <div>
      <h2 class="modals-title">請選擇分析模式</h2>
      <div class="modals">
        <button @click="modal = 'pk'">PK</button>
        <button @click="modal = 'single'">個人資料</button>
      </div>
    </div>
    <PKCandidates
      v-if="modal === 'pk'"
      :candidatesInDistricts="candidateStore.candidatesInDistricts"
    ></PKCandidates>
    <ACandidate
      v-if="modal === 'single'"
      :candidatesInDistricts="candidateStore.candidatesInDistricts"
    ></ACandidate>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 900px;
  margin: auto;
  .modals-title {
    margin-bottom: 0;
  }
  .modals {
    button {
      font-size: 1rem;
      line-height: 1;
      padding: 0.4em 0.6em;
      margin: 0.4em;
      background-color: #fff;
      border: 1px solid red;
      border-radius: 8px;
    }
  }
}
</style>
