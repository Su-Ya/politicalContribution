<script>
export default {
  name: "PCDashboard",
};
</script>

<script setup>
import { useCandidateStore } from "@/stores/candidate";
import { ref } from "vue";
import PKCandidates from "@/components/PKCandidates.vue";
import ACandidate from "@/components/ACandidate.vue";
import Utils from "@/utils/utils.js";

const candidateStore = useCandidateStore();

let modal = ref();
</script>

<template>
  <div class="container">
    <h1>2016 年立委候選人政治獻金分析</h1>
    <div>
      <h2 class="modals-title">請選擇分析模式</h2>
      <div class="modals">
        <button
          class="button outline-default"
          :class="{ active: modal === Utils.analyzeModals.pk }"
          @click="modal = Utils.analyzeModals.pk"
        >
          PK
        </button>
        <button
          class="button outline-default"
          :class="{ active: modal === Utils.analyzeModals.single }"
          @click="modal = Utils.analyzeModals.single"
        >
          個人資料
        </button>
      </div>
    </div>
    <PKCandidates
      v-if="modal === Utils.analyzeModals.pk"
      :candidatesInDistricts="candidateStore.candidatesInDistricts"
    ></PKCandidates>
    <ACandidate
      v-if="modal === Utils.analyzeModals.single"
      :candidatesInDistricts="candidateStore.candidatesInDistricts"
    ></ACandidate>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 900px;
  margin: auto;
  padding: 0 0.5rem;
  .modals-title {
    margin-bottom: 0;
  }
}
</style>
