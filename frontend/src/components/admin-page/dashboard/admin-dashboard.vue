<template>
  <!-- Main Content -->
  <div class="h-[80hv] 5 z-0 overflow-auto mt-4">
    <div class="flex flex-col md:flex-row gap-4 h-full">
      <!-- Column 1 -->
      <div class="flex flex-col gap-4 w-[23vw] h-full">
        <div class="bg-white rounded-lg h-[220px] shadow-sm border">
          <dashboardInfo />
        </div>
        <div class="bg-white h-[560px] rounded-xl shadow-sm border">
          <dashboardTransactionRequest />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="flex flex-col gap-4 w-full">
        <div class="h-[180px]"><dashboardCards /></div>
        <div class="bg-white h-[600px] rounded-xl shadow-sm border">
          <dashboardGraph />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import contentsCards from "./module/contents/contentsCards.vue";
// import contentRecents from "./module/contents/contentRecents.vue";
import dashboardInfo from "./module/dashboard-info.vue";
import dashboardCards from "./module/dashboard-cards.vue";
import dashboardGraph from "./module/dashboard-graph.vue";
import dashboardTransactionRequest from "./module/dashboard-transaction-request.vue";
export default {
  name: "DashboardPage",
  components: {
    // contentsCards,
    // contentRecents,
    dashboardInfo,
    dashboardCards,
    dashboardGraph,
    dashboardTransactionRequest,
  },
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
