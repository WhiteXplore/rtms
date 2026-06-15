<template>
  <div class="px-4 mt-3">
    <!-- Headers -->
    <div class="flex justify-between items-center">
      <h1 class="font-semibold tracking-wide text-lg">Transaction Logs</h1>
      <div class="text-text text-[13px] flex items-center gap-3">
        <lisLogout />
      </div>
    </div>

    <!-- Main Content  -->
    <div class="mt-3">
      <!-- Table -->
      <transactionTable />
    </div>
  </div>
</template>

<script>
import transactionTable from "./tables/transaction-table.vue";
export default {
  name: "TransactionLogsPage",
  components: {
    transactionTable,
  },
};
</script>

<style scoped>
/* Add any required styles here */
</style>
