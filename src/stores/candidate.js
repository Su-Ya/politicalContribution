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
  getters: {
    searchPoliticalContributions() {
      return ({ lebel = "", value = "" }) => {
        return this.allPoliticalContributionsIncome.filter(
          (item) => item[lebel] === value
        );
      };
    },

    // 各縣市 id
    districtIds() {
      const startId = 1;
      const endId = 24;
      const districts = [];
      for (let id = startId; id <= endId; id++) {
        districts.push({
          lebel: "地區排序",
          value: String(id),
        });
      }
      return districts;
    },

    // 各縣市候選人
    candidatesInDistricts() {
      return this.districtIds.map((item) =>
        this.searchPoliticalContributions(item)
      );
    },
  },
});
