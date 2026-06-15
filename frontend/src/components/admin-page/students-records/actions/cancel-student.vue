<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 w-screen"
  >
    <div class="rounded-xl shadow-lg w-full max-w-xl bg-white fixed top-22">
      <div class="text-text1 text-[13px] rounded-xl">
        <!-- Header -->
        <div
          class="w-full p-4 bg-white border-b text-orange-700 rounded-t-xl flex justify-between items-center"
        >
          <div class="flex items-center gap-1">
            <icon name="close" />
            <h1 class="font-bold tracking-wide text-[15px]">
              Cancellation/LOA/Drop with Permission
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
            <div class="flex justify-between mr-28">
              <div class="space-y-5 font-semibold">
                <p>Name:</p>
                <p>Program:</p>
                <p>Year Level:</p>
              </div>
              <div class="space-y-5">
                <p>
                  {{ student.first_name }} {{ student.middle_name }}
                  {{ student.last_name }}
                </p>
                <p>{{ student.program_course }}</p>
                <p>{{ student.current_level }}</p>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="flex flex-col space-y-2">
              <label class="font-semibold">Applied For:</label>
              <select
                v-model="form.appliedFor"
                class="px-3 py-3 border w-full border-gray-300 rounded-md text-gray-700"
                required
              >
                <option value="">Select</option>
                <option value="drop">Drop</option>
                <option value="stop">Stop</option>
              </select>
            </div>

            <div class="flex gap-2">
              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">Semester</label>
                <select
                  v-model="form.semester"
                  class="px-3 py-3 border w-full border-gray-300 rounded-md text-gray-700"
                  required
                >
                  <option value="">Select</option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                </select>
              </div>
              <div class="flex flex-col space-y-2 flex-1">
                <label class="font-semibold">School Year:</label>
                <select
                  v-model="form.schoolYear"
                  class="px-3 py-3 border w-full border-gray-300 rounded-md text-gray-700"
                  required
                >
                  <option value="">Select</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col space-y-2">
              <label class="font-semibold">Reason:</label>
              <textarea
                v-model="form.reason"
                class="py-2 px-3 border w-full h-24 border-gray-300 rounded-md text-gray-700"
                required
                placeholder="Enter reason ..."
              ></textarea>
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
            class="bg-blue-700 hover:bg-blue-300 px-5 py-2 rounded-md text-white hover:text-blue-700"
            @click="submitData"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <!-- Validation Modal -->
    <div
      v-if="showValidationModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
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
  </div>
</template>

<script>
import icon from "@/assets/icon.vue";
import axios from "axios";

export default {
  name: "CancellationPage",
  props: {
    student: Object,
    isOpen: Boolean,
  },
  components: {
    icon,
  },
  data() {
    return {
      form: {
        appliedFor: "",
        semester: "",
        schoolYear: "",
        reason: "",
      },
      validationErrors: [],
      showValidationModal: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async submitData() {
      this.validationErrors = [];

      if (!this.form.appliedFor)
        this.validationErrors.push("Applied For is required.");
      if (!this.form.semester)
        this.validationErrors.push("Semester is required.");
      if (!this.form.schoolYear)
        this.validationErrors.push("School Year is required.");
      if (!this.form.reason) this.validationErrors.push("Reason is required.");

      if (this.validationErrors.length > 0) {
        this.showValidationModal = true;
        return;
      }

      const cancellationData = {
        // studentID: this.student.id || this.student.student_id || "N/A",
        fk_student_generated_id: `${this.student.student_records_generated_id} `,
        fullname: `${this.student.first_name} ${this.student.middle_name} ${this.student.last_name}`,
        year_level: `${this.student.current_level} `,
        program_course: this.student.program_course,
        applied_for: this.form.appliedFor,
        semester: this.form.semester,
        school_year: this.form.schoolYear,
        reason: this.form.reason,
      };

      console.log("Cancellation Data:", cancellationData);

      try {
        const response = await axios.post(
          "http://localhost:8000/student-cancellation/add-cancellation",
          cancellationData
        );
        console.log("Cancellation API Response:", response.data);
      } catch (error) {
        console.error("Error submitting cancellation:", error);
      }

      this.$emit("submit-cancellation", cancellationData);
      this.closeModal();
    },
  },
};
</script>
