import { defineStore } from "pinia";
import mirrorMediaHttp from "@/api/mirror-media-http";

export const useCandidateStore = defineStore("candidate", {
  state: () => ({
    // 所有候選人的政治獻金總表
    allPoliticalContributionsIncome: null,
  }),
  actions: {
    async fetchAllPoliticalContributionsIncome() {
      const res = await mirrorMediaHttp.get(
        "/politicalcontribution/master/legislators/2016/A05_basic_all.csv"
      );
      this.allPoliticalContributionsIncome = res;
    },
  },
});
