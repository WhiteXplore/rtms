<template>
  <div class="mt-2">
    <div
      class="max-h-[650px] overflow-y-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
    >
      <table class="w-full bg-white">
        <thead
          class="bg-gray-100 text-gray-700 text-sm font-semibold sticky top-0"
        >
          <tr>
            <th class="py-3 px-4 text-left text-[12px]">Type Document</th>
            <th class="py-3 px-4 text-center text-[12px]">Document Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            class="border-b border-gray-100 transition"
          >
            <td class="py-4 px-4 text-[12px]">{{ item.type_of_documents }}</td>
            <td class="py-4 px-4 text-center flex justify-center">
              <template v-if="item.type_of_documents === 'OLSAT Stanine'">
                <span
                  class="px-3 py-1 flex justify-center items-center rounded-full text-[10px] gap-1"
                  :class="{
                    'bg-green-100 text-green-600':
                      item.document_status !== 'Not Submitted',
                    'bg-red-100 text-red-600':
                      item.document_status === 'Not Submitted',
                  }"
                >
                  <icon
                    :name="
                      item.document_status === item.document_status
                        ? 'check2'
                        : 'circle-close2'
                    "
                  />
                  {{ item.document_status || "Not Submitted" }}
                </span>
              </template>
              <template v-else>
                <button
                  class="flex items-center justify-center gap-1 px-2 py-1 rounded-full text-[10px]"
                  :class="{
                    'bg-green-100 text-green-600':
                      item.document_status === 'Submitted',
                    'bg-red-100 text-red-600':
                      item.document_status === 'Not Submitted',
                  }"
                >
                  <icon
                    :name="
                      item.document_status === 'Submitted'
                        ? 'check2'
                        : 'circle-close2'
                    "
                  />
                  {{ item.document_status }}
                </button>
              </template>
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
  name: "TableDocumentSubmitted",
  components: {
    icon,
  },
  data() {
    return {
      items: [],
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
    async fetchDocuments() {
      if (!this.studentGeneratedId) {
        console.warn("No valid student ID found.");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/students-document-submitted/get-documents"
        );

        // Filter documents that match the current student ID
        this.items = response.data
          .filter(
            (item) => item.fk_student_generated_id === this.studentGeneratedId
          )
          .map((item) => ({
            ...item,
            document_status:
              item.type_of_documents === "OLSAT Stanine" && item.document_status
                ? item.document_status
                : item.document_status === "Submitted"
                ? "Submitted"
                : "Not Submitted",
          }));
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    startAutoRefresh() {
      this.refreshInterval = setInterval(() => {
        this.fetchDocuments();
      }, 3000);
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    },
  },
  mounted() {
    this.fetchDocuments();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
};
</script>
