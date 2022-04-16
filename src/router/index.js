import { createRouter, createWebHistory } from "vue-router";
import pinia from "@/stores/pinia";
import { useCandidateStore } from "@/stores/candidate";

const candidateStore = useCandidateStore(pinia);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: () => {
        return { name: "Dashboard" };
      },
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
      beforeEnter: async () => {
        await Promise.all([
          candidateStore.fetchAllPoliticalContributionsIncome(),
          candidateStore.fetchAllForProfitDonationsIncome(),
        ]);
      },
    },
  ],
});

export default router;
