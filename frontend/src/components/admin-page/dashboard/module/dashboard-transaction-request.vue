<template>
  <div class="p-4 mt-2">
    <h1 class="text-center">Transaction Request</h1>
  </div>
  <div class="container mx-auto p-2">
    <table class="min-w-full table-auto border-collapse">
      <thead>
        <tr class="border-b w-full text-[14px]">
          <th class="px-4 py-2 text-left w-2/3">Status</th>
          <th class="px-4 py-2 text-left w-1/3">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in statusData"
          :key="index"
          :class="{ 'border-b': item.status !== 'Total Transaction' }"
        >
          <td class="px-4 py-4">
            <div
              :class="[
                item.statusBg,
                item.statusTextColor,
                item.status === 'Total Transaction'
                  ? 'text-[13px] font-semibold'
                  : '',
                'inline-flex px-3 py-1 justify-center items-center rounded-full tracking-wide text-[11px] font-semibold',
              ]"
            >
              {{ item.status }}
            </div>
          </td>
          <td
            class="px-4 py-2 text-[13px]"
            :class="{ 'font-semibold': item.total === 100 }"
          >
            {{ item.total }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardTransactionRequest",
  data() {
    return {
      pending: 0,
      processing: 0,
      processed: 0,
      completed: 0,
      onProcess: 0,
      readyForClaim: 0,
    };
  },
  computed: {
    statusData() {
      return [
        {
          status: "Pending",
          statusBg: "bg-red-200",
          statusTextColor: "text-red-500",
          total: this.pending,
        },
        {
          status: "Processing",
          statusBg: "bg-blue-200",
          statusTextColor: "text-blue-500",
          total: this.processing,
        },
        {
          status: "Processed",
          statusBg: "bg-green-200",
          statusTextColor: "text-green-500",
          total: this.processed,
        },
        {
          status: "On-Process",
          statusBg: "bg-yellow-200",
          statusTextColor: "text-yellow-500",
          total: this.onProcess,
        },
        {
          status: "Ready for Claim",
          statusBg: "bg-purple-200",
          statusTextColor: "text-purple-500",
          total: this.readyForClaim,
        },
        {
          status: "Completed",
          statusBg: "bg-pink-200",
          statusTextColor: "text-pink-500",
          total: this.completed,
        },
        {
          status: "Total Transaction",
          total:
            this.pending +
            this.processing +
            this.processed +
            this.completed +
            this.onProcess +
            this.readyForClaim,
        },
      ];
    },
  },
  methods: {
    async fetchProcessing() {
      try {
        const response = await axios.get(
          "http://localhost:8000/transaction-logs-data/get-transaction-logs"
        );

        // Initialize the counters
        this.pending = 0;
        this.processing = 0;
        this.processed = 0;
        this.completed = 0;
        this.onProcess = 0;
        this.readyForClaim = 0;

        // Count the occurrences of each status
        response.data.forEach((item) => {
          switch (item.status) {
            case "PENDING":
              this.pending++;
              break;
            case "PROCESSING":
              this.processing++;
              break;
            case "PROCESSED":
              this.processed++;
              break;
            case "COMPLETED":
              this.completed++;
              break;
            case "ON PROCESS":
              this.onProcess++;
              break;
            case "READY FOR CLAIM":
              this.readyForClaim++;
              break;
            default:
              break;
          }
        });
      } catch (error) {
        console.error("Error fetching processing transactions:", error);
      }
    },
  },
  mounted() {
    this.fetchProcessing();
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
