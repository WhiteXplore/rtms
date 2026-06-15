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
            <h1 class="font-bold tracking-wide text-lg">
              Add New Transactions
            </h1>
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
                  v-model="form.first_name"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter first name ..."
                />
              </div>

              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">Middle Name :</label>
                <input
                  v-model="form.middle_name"
                  type="text"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter middle name ..."
                />
              </div>

              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">Last Name :</label>
                <input
                  v-model="form.last_name"
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
                    v-model="form.program_course"
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
                    v-model="form.status"
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
                    v-model="form.school_year_admitted"
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
                    v-model="form.semester"
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
                    v-model="form.document_stamp"
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
                      type="text"
                      placeholder="Search purpose..."
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
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
              <div
                v-for="(doc, index) in form.documents"
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
                    v-model="form.remarks"
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
  <div v-if="isSuccessfulAdd"><transactionConfirmedSubmit /></div>
  <!-- Validation Modal -->
  <div
    v-if="showValidationModal"
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
      <!-- Header -->
      <div class="bg-Green px-4 py-2">
        <h2 class="text-lg font-semibold text-white">Form Incomplete</h2>
      </div>

      <!-- Warning Message -->
      <div
        class="bg-red-100 text-gray-800 rounded-md text-sm py-2 px-3 mt-4 mx-4 flex items-start gap-2"
      >
        <icon name="exclamationmark" class="text-red-600 mt-1" />
        <p>If you want to submit without input, please put "N/A".</p>
      </div>

      <!-- Validation Errors -->
      <ul
        class="list-disc list-inside text-gray-700 space-y-1 my-4 mx-6 text-sm"
      >
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>

      <!-- Action Button -->
      <div class="flex justify-end px-4 pb-4">
        <button
          class="bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-md text-sm"
          @click="showValidationModal = false"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import icon from "@/assets/icon.vue";
import { transactionsData } from "../../store/transactionsData";
import transactionConfirmedSubmit from "../alert/transaction-confirmed-submit.vue";

export default {
  name: "AddTransactionLogs",
  components: {
    icon,
    transactionConfirmedSubmit,
  },
  data() {
    return {
      isOpen: true,
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        program_course: "",
        status: "",
        school_year_admitted: "",
        semester: "",
        purpose_of_transaction: "",
        document_stamp: "",
        documents: [],
        remarks: "",
        staff_fullname: "",
        staff_email: "",
      },
      searchQuery: "",
      showDropdown: false,
      isSuccessfulAdd: false,
      userdetail: {},
      validationErrors: [],
      showValidationModal: false,
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
    closeAdd() {
      this.isOpen = false;
      this.$emit("close");
    },
    selectPurpose(purpose) {
      this.form.purpose_of_transaction = purpose;
      this.searchQuery = purpose;
      this.showDropdown = false;
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200);
    },
    addDocument() {
      if (
        this.form.documents.every((doc) => doc.document && doc.document_copies)
      ) {
        this.form.documents.push({ document: "", document_copies: "" });
      }
    },
    removeDocument(index) {
      this.form.documents.splice(index, 1);
    },
    async submitData() {
      const validDocuments = this.form.documents.filter(
        (doc) => doc.document && doc.document_copies
      );

      const transactions_formData = {
        ...this.form,
        documents: validDocuments,
      };

      console.log(
        "Submitting data:",
        JSON.stringify(transactions_formData, null, 2)
      );
      this.validationErrors = []; // Reset validation errors
      if (!this.form.first_name)
        this.validationErrors.push("First Name is required.");
      if (!this.form.middle_name)
        this.validationErrors.push("Middle Name is required.");
      if (!this.form.last_name)
        this.validationErrors.push("Last Name is required.");
      if (!this.form.program_course)
        this.validationErrors.push("Program/Course is required.");
      if (!this.form.status) this.validationErrors.push("Status is required.");
      if (!this.form.school_year_admitted)
        this.validationErrors.push("Last School Year Admitted is required.");
      if (!this.form.semester)
        this.validationErrors.push("Last Semester Admitted is required.");
      if (!this.form.document_stamp)
        this.validationErrors.push("Documentary Stamp is required.");
      if (!this.form.purpose_of_transaction)
        this.validationErrors.push("Purpose of Transaction is required.");
      if (this.validationErrors.length > 0) {
        this.showValidationModal = true;
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/transaction-logs-data/add-transaction-logs",
          transactions_formData
        );
        console.log("API Response:", response.data);
        this.isOpen = false; // Close modal after successful submission
        this.isSuccessfulAdd = true;
      } catch (error) {
        console.error("Submission failed:", error.response?.data || error);
      }
    },

    // ✅ Fetch Staff User Details and set to form
    async fetchStaffDetails() {
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });
        if (response.data) {
          this.userdetail = response.data;

          this.form.staff_fullname = `${response.data.first_name} ${response.data.last_name}`;
          this.form.staff_email = `${response.data.email}`;
          console.log("Add Staff User Details:", this.userdetail);
        }
      } catch (error) {
        console.error("Failed to fetch staff details:", error);
      }
    },
  },
  mounted() {
    this.fetchStaffDetails();
  },
};
</script>
