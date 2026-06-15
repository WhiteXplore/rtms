<template>
  <div class="">
    <div
      class="max-h-[400px] overflow-y-auto rounded-b-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
    >
      <table class="w-full table-fixed bg-white">
        <thead
          class="bg-gray-100 text-gray-700 text-sm font-semibold sticky top-0"
        >
          <tr>
            <th class="py-3 px-4 text-left text-[12px] w-1/4">Staff Name</th>
            <th class="py-3 px-4 text-left text-[12px] w-1/2">Action</th>
            <th class="py-3 px-4 text-left text-[12px] w-1/4">Added On</th>
            <th class="py-3 px-4 text-center text-[12px] w-1/4">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-if="logHistories.length === 0"
            class="text-center text-gray-500 text-sm"
          >
            <td colspan="4" class="py-6">No log history found.</td>
          </tr>
          <tr
            v-else
            v-for="(logs, index) in logHistories"
            :key="index"
            class="border-b border-gray-100 transition"
          >
            <td class="py-4 px-4 text-[12px] w-1/3 truncate">
              {{ logs.staff_name }}
            </td>
            <td
              class="py-4 px-4 text-left text-[12px] w-auto whitespace-normal break-words"
            >
              {{ logs.action_did }}
            </td>

            <td class="py-4 px-4 text-left text-[12px] w-1/3 truncate">
              {{ formatDate(logs.added_on) }}
            </td>
            <td class="px-4 py-3 flex gap-2 text-[11px] justify-center">
              <button
                class="p-2 py-1 border-2 border-red-200 hover:bg-red-300 text-red-700 rounded-lg flex gap-1 items-center"
                @click="toggleDelete(logs)"
              >
                <icon name="delete" /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { decryptData } from "../../util/cryptoHelper";
import icon from "@/assets/icon.vue";
export default {
  name: "LogHistoryTable",
  components: {
    icon,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      logHistories: [],
      refreshInterval: null,
    };
  },
  computed: {
    studentGeneratedId() {
      const studentFromLocalStorage = localStorage.getItem("studentData");
      if (studentFromLocalStorage) {
        try {
          const decryptedStudent = decryptData(studentFromLocalStorage);
          return decryptedStudent?.student_records_generated_id || null;
        } catch (error) {
          console.error("Error decrypting student data:", error);
          return null;
        }
      }
      return null;
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
    async fetchAdditionalRequirements() {
      try {
        const response = await axios.get(
          "http://localhost:8000/students-log-history/get-log"
        );

        // Filter data based on studentGeneratedId
        this.logHistories = response.data.filter(
          (doc) => doc.fk_student_generated_id === this.studentGeneratedId
        );
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Failed to fetch data.";
      }
    },
    startAutoRefresh() {
      if (!this.refreshInterval) {
        this.refreshInterval = setInterval(() => {
          this.fetchAdditionalRequirements();
        }, 3000);
      }
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    },
  },
  mounted() {
    this.fetchAdditionalRequirements();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
};
</script>
