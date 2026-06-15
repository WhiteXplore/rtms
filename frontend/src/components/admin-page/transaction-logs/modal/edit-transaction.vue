<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 w-min-screen"
  >
    <div class="rounded-[15px] shadow-lg fixed top-22">
      <div class="w-[1000px] bg-white text-text1 text-[13px] rounded-[15px]">
        <div
          class="w-full p-5 py-3 bg-Green text-white rounded-t-[15px] flex justify-between items-center"
        >
          <div class="flex gap-2 items-center">
            <icon :name="'add-docs'" />
            <h1 class="font-bold tracking-wide text-lg">Edit Transactions</h1>
          </div>

          <icon
            :name="'circle-close3'"
            @click="closeAdd"
            class="cursor-pointer"
          />
        </div>
        <div class="overflow-y-auto max-h-[700px] p-5 space-y-3">
          <div class="text-gray-700 space-y-4 border p-3 rounded-md">
            <!-- First Row  -->
            <div class="flex flex-row gap-3 text-tex1 w-full">
              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">First Name :</label>
                <input
                  v-model="transactionCopy.first_name"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter first name ..."
                />
              </div>

              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">Middle Name :</label>
                <input
                  v-model="transactionCopy.middle_name"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter middle name ..."
                />
              </div>

              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">Last Name :</label>
                <input
                  v-model="transactionCopy.last_name"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter last name ..."
                />
              </div>
            </div>
          </div>
          <!-- BOTTOM CONTENT  -->

          <div class="flex justify-between w-full space-x-3">
            <div class="text-gray-700 space-y-4 border p-3 rounded-md w-full">
              <!-- 1st Row Content  -->
              <div class="flex gap-x-4">
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Program/Course :</label>
                  <select
                    v-model="transactionCopy.program_course"
                    name="program_course"
                    id="program_course"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="" class="text-gray-500">Select</option>
                    <option
                      v-for="(program_course, index) in availableProgramCourse"
                      :key="index"
                      :value="program_course"
                    >
                      {{ program_course }}
                    </option>
                  </select>
                </div>
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Status :</label>
                  <select
                    v-model="transactionCopy.status"
                    name="status"
                    id="status"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="" class="text-gray-500">Select</option>
                    <option
                      v-for="(status, index) in availableTransactionStatus"
                      :key="index"
                      :value="status"
                    >
                      {{ status }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- 2nd Row Content  -->
              <div class="flex gap-x-4">
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold"
                    >Last School Year Admitted :</label
                  >
                  <select
                    v-model="transactionCopy.school_year_admitted"
                    name="school_year_admitted"
                    id="school_year_admitted"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(
                        school_year_admitted, index
                      ) in availableSchoolYear"
                      :key="index"
                      :value="school_year_admitted"
                    >
                      {{ school_year_admitted }}
                    </option>
                  </select>
                </div>
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Last Semester Admitted :</label>
                  <select
                    v-model="transactionCopy.semester"
                    name="semester"
                    id="semester"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(semester, index) in availableSemester"
                      :key="index"
                      :value="semester"
                    >
                      {{ semester }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- 3rd Row Content  -->
              <div class="flex gap-x-4">
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Documentary Stamp :</label>
                  <input
                    v-model="transactionCopy.document_stamp"
                    type="text"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                    placeholder="Enter number of doc stamp ..."
                  />
                </div>
              </div>
              <!-- 4th Row Content  -->
              <div class="flex gap-x-4">
                <div class="text-gray-700 space-y-4 rounded-md w-full">
                  <!-- 4th Row Content  -->
                  <div class="flex flex-col space-y-2 w-full relative">
                    <label class="font-semibold"
                      >Purpose of Transaction :</label
                    >
                    <input
                      v-model="searchQuery"
                      placeholder="Search purpose..."
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      @input="updateSearchQuery"
                      @focus="showDropdown = true"
                      @blur="hideDropdown"
                    />

                    <!-- Dropdown List -->
                    <div
                      v-if="showDropdown && filteredPurposes.length"
                      class="absolute top-[60px] w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto z-10"
                    >
                      <div
                        v-for="(purpose, index) in filteredPurposes"
                        :key="index"
                        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        @mousedown="selectPurpose(purpose)"
                      >
                        {{ purpose }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 6th Row Content Right  -->
            <!-- Document Requested Section -->
            <div
              class="text-gray-700 space-y-4 border p-3 rounded-md w-full overflow-y-auto max-h-[450px]"
            >
              <div class="flex justify-between items-center">
                <h1 class="font-semibold">Document Requested :</h1>
                <button
                  @click="addDocument"
                  class="bg-green-700 hover:bg-green-300 px-3 py-1 rounded-md text-white hover:text-green-700"
                >
                  Add Document
                </button>
              </div>

              <!-- Dynamically Added Documents -->
              <!-- Dynamically Added Documents -->
              <div
                v-for="(doc, index) in transactionCopy.documents"
                :key="index"
                class="flex gap-2 items-center mt-2 w-full"
              >
                <input
                  v-model="doc.document"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter document name..."
                />
                <input
                  v-model="doc.document_copies"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter document copies..."
                />
                <button
                  @click="removeDocument(index)"
                  class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-300"
                >
                  Remove
                </button>
              </div>

              <!-- 5th Row Content  -->
              <div class="w-full h-[120px]">
                <div class="flex flex-col space-y-2 flex-1 h-full">
                  <label class="font-semibold">Remarks:</label>
                  <textarea
                    v-model="transactionCopy.remarks"
                    class="px-3 py-2 border w-full h-full border-gray-300 rounded-md text-gray-700 bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons  -->
          <div class="flex place-items-end justify-end gap-2 mt-5">
            <button
              class="bg-red-500 hover:bg-red-300 px-5 py-2 rounded-md text-white hover:text-red-700"
              @click="closeAdd"
            >
              Cancel
            </button>
            <button
              class="bg-green-700 hover:bg-green-300 px-5 py-2 rounded-md text-white hover:text-green-700"
              @click="submitData"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isSuccessfulAdd"><successfulAdd /></div>
</template>

<script>
import axios from "axios";
import icon from "@/assets/icon.vue";
import { transactionsData } from "../../store/transactionsData";
import { decryptData, encryptData } from "../../util/cryptoHelper";

export default {
  name: "EditTransactionLogs",
  components: {
    icon,
  },
  props: {
    transaction: Object,
  },
  data() {
    return {
      isOpen: true,
      searchQuery: "",
      showDropdown: false,
      isSuccessfulAdd: false, // Ensure it exists
      transactionCopy: {
        first_name: "",
        middle_name: "",
        last_name: "",
        program_course: "",
        status: "",
        school_year_admitted: "",
        semester: "",
        document_stamp: "",
        purpose_of_transaction: "",
        documents: [],
        remarks: "",
      },
      fetchParasaDocs: [],
    };
  },
  setup() {
    const TransactionStore = transactionsData();

    return {
      availablePurpose: TransactionStore.getPurpose,
      availableTransactionStatus: TransactionStore.getTransactionStatus,
      availableProgramCourse: TransactionStore.getProgramCourse,
      availableSchoolYear: TransactionStore.getSchoolYear,
      availableSemester: TransactionStore.getSemester,
    };
  },
  computed: {
    filteredPurposes() {
      if (!this.searchQuery) return this.availablePurpose;
      return this.availablePurpose.filter((purpose) =>
        purpose.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    updateSearchQuery(event) {
      this.searchQuery = event.target.value;
      this.transactionCopy.purpose_of_transaction = event.target.value;
    },
    closeAdd() {
      this.isOpen = false;
      this.$emit("close");
    },
    selectPurpose(purpose) {
      this.transactionCopy.purpose_of_transaction = purpose;
      this.searchQuery = purpose;
      this.showDropdown = false;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    addDocument() {
      if (!this.transactionCopy.documents) {
        this.transactionCopy.documents = [];
      }

      const allFilled = this.transactionCopy.documents.every(
        (doc) => doc.document && doc.document_copies
      );

      if (!allFilled) {
        alert("Please fill in all existing documents before adding a new one.");
        return;
      }

      this.transactionCopy.documents.push({
        document: "",
        document_copies: "",
      });
    },
    removeDocument(index) {
      this.transactionCopy.documents.splice(index, 1);
    },
    async submitData() {
      this.isLoading = true;
      try {
        if (!this.transactionCopy || !this.transactionCopy.id) {
          console.error("❌ No transaction data to submit.");
          return;
        }

        console.log("📤 Sending Plain Data to API:", this.transactionCopy);

        const response = await axios.patch(
          `http://localhost:8000/transaction-logs-data/${this.transactionCopy.id}`,
          this.transactionCopy,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("📩 API Response:", response.data);

        // Update transaction data in the component
        this.transactionCopy = response.data;

        // Encrypt and store updated data in localStorage
        const encryptedResponseData = encryptData(response.data);
        localStorage.setItem("transactionData", encryptedResponseData);
        console.log("✅ Encrypted transaction data saved to localStorage.");

        // Show success message
        this.isSuccessfulAdd = true;

        // Close modal
        this.isOpen = false;

        // Emit event to update parent component with new data
        this.$emit("update-transaction", response.data);
      } catch (error) {
        console.error("❌ Submission failed:", error.response?.data || error);
      } finally {
        this.isLoading = false;
      }
    },
    loadStudentFromLocalStorage() {
      const storedTransaction = localStorage.getItem("transactionData");
      if (!storedTransaction) return;

      try {
        const decryptedData = decryptData(storedTransaction);
        if (decryptedData && typeof decryptedData === "object") {
          this.transactionCopy = decryptedData;
        } else {
          console.warn("⚠️ Invalid decrypted data format.");
        }
      } catch (error) {
        console.error("❌ Failed to decrypt student data:", error);
      }
    },
  },
  watch: {
    transaction: {
      handler(newVal) {
        if (newVal) {
          this.transactionCopy = {
            ...newVal,
            documents: newVal.documents || [],
          };

          this.searchQuery = newVal.purpose_of_transaction || "";
          console.log(
            "🔄 transactionCopy updated from prop:",
            this.transactionCopy
          );
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.loadStudentFromLocalStorage();
    if (!this.transactionCopy.documents) {
      this.transactionCopy.documents = [];
    }
  },
};
</script>
