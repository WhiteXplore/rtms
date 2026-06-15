<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center z-50 w-screen"
  >
    <div class="rounded-[15px] shadow-lg fixed top-20">
      <div class="w-auto bg-white text-text1 text-[13px] rounded-[15px]">
        <div
          class="w-full p-5 py-2 bg-Green text-white rounded-t-[15px] flex justify-between items-center"
        >
          <div class="flex items-center gap-1">
            <icon name="edit" />
            <h1 class="font-bold tracking-wide text-lg">
              Edit Documents/Records Submitted
            </h1>
          </div>
          <icon name="circle-close3" @click="closeAdd" class="cursor-pointer" />
        </div>

        <!-- Document Toggle Switches -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-b p-4 gap-10"
        >
          <div
            v-for="(value, key) in toggles"
            :key="key"
            class="flex items-center justify-between"
          >
            <label class="font-semibold">{{ formatLabel(key) }}</label>
            <div v-if="key === 'OLSAT Stanine'">
              <input
                type="text"
                v-model="toggles[key]"
                class="border border-gray-300 rounded p-2 text-black w-24"
                placeholder="Enter Score"
              />
            </div>
            <div
              v-else
              class="relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300"
              :class="value ? 'bg-green-500' : 'bg-gray-300'"
              @click="toggle(key)"
            >
              <span
                class="absolute left-2 text-xs font-bold transition-all duration-300"
                :class="value ? 'text-gray-300' : 'text-white'"
                >No</span
              >
              <span
                class="absolute right-2 text-xs font-bold transition-all duration-300"
                :class="value ? 'text-green' : 'text-gray-400'"
                >Yes</span
              >
              <div
                class="w-7 h-7 bg-white rounded-full shadow-md transform transition-all duration-300"
                :class="{ 'translate-x-8': value }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex justify-end gap-2 p-4">
          <button
            class="bg-gray-500 hover:bg-gray-300 px-5 py-2 rounded-md text-white hover:text-gray-700"
            @click="closeAdd"
          >
            Cancel
          </button>
          <button
            class="bg-blue-700 hover:bg-blue-300 px-5 py-2 rounded-md text-white hover:text-blue-700"
            @click="submitData"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isSuccessfulAdd"><studentConfirmedSubmit /></div>
</template>

<script>
import axios from "axios";
import icon from "@/assets/icon.vue";
import { decryptData } from "../../util/cryptoHelper";
import studentConfirmedSubmit from "../alert/student-confirmed-submit.vue";
export default {
  name: "DocumentsSubmitted",
  components: { icon, studentConfirmedSubmit },
  props: {
    studentId: String,
  },
  data() {
    return {
      isOpen: true,
      isConfirmedSubmitted: false,
      toggles: {
        "OLSAT Stanine": "",
        "Report Card": false,
        "Good Moral": false,
        "ID Picture (2x2)": false,
        "Medical Certificate": false,
        "Form 137-A": false,
        "Cert of Eligibility to Transfer": false,
        "OTR (Evaluation Purposes)": false,
        "OTR (Official Copy for DNSC)": false,
        "Local/Original Birth Certificate": false,
        "PSA/NSO Birth Certificate": false,
        "Marriage Contract": false,
      },
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
    closeAdd() {
      this.isOpen = false;
      this.$emit("close");
    },
    toggle(key) {
      if (key !== "OLSAT Stanine") {
        this.toggles[key] = !this.toggles[key];
      }
    },
    formatLabel(key) {
      return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
    async submitData() {
      try {
        if (!this.studentGeneratedId) {
          console.error("Error: studentGeneratedId is null");
          return;
        }

        const documentsArray = Object.keys(this.toggles).map((key) => ({
          fk_student_generated_id: this.studentGeneratedId,
          type_of_documents: key,
          document_status:
            key === "OLSAT Stanine" &&
            (!this.toggles[key] || this.toggles[key].trim() === "")
              ? "Not Submitted"
              : key === "OLSAT Stanine"
              ? this.toggles[key]
              : this.toggles[key]
              ? "Submitted"
              : "Not Submitted",
        }));

        await axios.post(
          "http://localhost:8000/students-document-submitted/add-document",
          documentsArray
        );
        this.isSuccessfulAdd = true;
        this.isOpen = false;
        setTimeout(() => {
          this.isConfirmedSubmitted = false;
        }, 1500);
        this.isOpen = false;
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Failed to submit data. Please try again.");
      }
    },
    async fetchDocuments() {
      try {
        const response = await axios.get(
          "http://localhost:8000/students-document-submitted/get-documents"
        );
        const documents = response.data;
        if (!this.studentGeneratedId) {
          console.error("Error: studentGeneratedId is null");
          return;
        }
        documents.forEach((doc) => {
          if (doc.fk_student_generated_id === this.studentGeneratedId) {
            this.toggles[doc.type_of_documents] =
              doc.type_of_documents === "OLSAT Stanine"
                ? doc.document_status
                : doc.document_status === "Submitted";
          }
        });
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
  },
  mounted() {
    this.fetchDocuments();
  },
};
</script>
