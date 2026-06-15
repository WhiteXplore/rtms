<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center z-50 w-screen"
  >
    <div class="rounded-[15px] shadow-lg w-full max-w-lg bg-white fixed top-22">
      <div class="text-text1 text-[13px] rounded-[15px]">
        <div
          class="w-full p-4 py-3 bg-white-400/20 backdrop-blur-xl text-blue-400 rounded-t-[15px] flex justify-between items-center border-b"
        >
          <div class="flex gap-2 items-center">
            <icon :name="'additional-requirements'" />
            <h1 class="font-bold tracking-wide text-lg">
              Additional Requirements
            </h1>
          </div>
          <icon
            name="circle-close3"
            @click="closeModal"
            class="cursor-pointer"
          />
        </div>

        <!-- Main Content -->
        <div class="p-4 space-y-4">
          <div class="text-gray-700 space-y-4 border-b pb-4">
            <div
              v-if="errorMessage"
              class="bg-red-100 rounded-lg p-2 py-3 flex items-center gap-1"
            >
              <icon name="exclamationmark" class="text-red-900" />
              <p class="text-gray-800">{{ errorMessage }}</p>
            </div>
            <div class="flex flex-col space-y-2">
              <label class="font-semibold">Document Name:</label>
              <input
                v-model="documentName"
                type="text"
                class="px-3 py-3 border w-full border-gray-300 rounded-md text-gray-700"
                placeholder="Enter document name..."
              />
            </div>
          </div>
        </div>

        <!-- Submit and Cancel Button -->
        <div class="flex place-items-end justify-end gap-2 p-4">
          <button
            class="bg-gray-500 hover:bg-gray-300 px-5 py-2 rounded-md text-white hover:text-gray-700"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            :disabled="loading"
            class="bg-blue-700 hover:bg-blue-300 px-5 py-2 rounded-md text-white hover:text-blue-700"
            @click="submitData"
          >
            {{ loading ? "Submitting..." : "Save" }}
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
  name: "AdditionalRequirementsModal",
  components: {
    icon,
    studentConfirmedSubmit,
  },

  data() {
    return {
      isOpen: true,
      documentName: "",
      loading: false,
      errorMessage: "",
      isSuccessfulAdd: false,
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
    closeModal() {
      this.isOpen = false;
      this.$emit("close"); // Emits event to close modal
    },

    async submitData() {
      if (!this.documentName.trim()) {
        this.errorMessage = "Document name cannot be empty!";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post(
          "http://localhost:8000/additional-requirements/add-requirement",
          {
            fk_student_generated_id: this.studentGeneratedId,
            additional_document_name: this.documentName,
          }
        );
        this.isSuccessfulAdd = true;
        this.isOpen = false;
        console.log("Success:", response.data);
        this.$emit("submitted", response.data); // Emit event with new data
        this.documentName = ""; // Reset input field
        this.closeModal();
      } catch (error) {
        console.error("Error submitting data:", error);
        this.errorMessage =
          error.response?.data?.message || "Failed to submit data.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
