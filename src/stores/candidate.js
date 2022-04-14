import { defineStore } from "pinia";
import mirrorMediaHttp from "@/api/mirror-media-http";
import convertCSV2JSON from "@/utils/csv2json";

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
      const options = {
        parseNumbers: false,
        separator: ",",
      };
      this.allPoliticalContributionsIncome = convertCSV2JSON(res, options);
    },
  },
});
