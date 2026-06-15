<template>
  <div class="mt-4">
    <div
      class="max-h-[400px] overflow-y-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
    >
      <table class="w-full bg-white">
        <thead
          class="bg-gray-100 text-gray-700 text-sm font-semibold sticky top-0"
        >
          <tr class="text-[11px]">
            <th class="py-3 px-4 text-left">Document Name</th>
            <th class="py-3 px-4 text-left">Added On</th>
            <th class="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="documentNames.length === 0"
            class="text-center text-gray-500 text-sm"
          >
            <td colspan="4" class="py-6">
              No additional requirements submitted history found.
            </td>
          </tr>
          <tr
            v-for="(document, index) in documentNames"
            :key="index"
            class="border-b border-gray-100 transition"
          >
            <td class="py-4 px-4 text-left text-[13px]">
              {{ document.additional_document_name }}
            </td>
            <td class="py-4 px-4 text-left text-[13px]">
              {{ formatDate(document.added_on) }}
            </td>

            <td class="px-4 py-3 flex gap-2 text-[11px] justify-center">
              <button
                class="p-2 py-1 border-2 border-red-200 hover:bg-red-300 text-red-700 rounded-lg flex gap-1 items-center"
                @click="toggleDelete(item)"
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
import icon from "@/assets/icon.vue";
import { decryptData } from "../../util/cryptoHelper";
export default {
  name: "TableAdditionalRequirements",
  components: { icon },
  data() {
    return {
      loading: false,
      errorMessage: "",
      documentNames: [],
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
      if (!this.studentGeneratedId) {
        console.warn("No student ID found, skipping fetch.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/additional-requirements/get-requirement"
        );

        // Filter data based on studentGeneratedId
        this.documentNames = response.data.filter(
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
