<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-800 bg-opacity-20 flex justify-center items-center z-50 w-min-screen"
  >
    <div class="rounded-[15px] shadow-lg fixed top-22">
      <div
        class="w-auto bg-white text-text1 text-[13px] rounded-[15px] shadow-lg"
      >
        <div
          class="w-full p-5 py-3 bg-Green text-white rounded-t-[15px] flex justify-between items-center border-b shadow"
        >
          <div class="flex gap-1 items-center">
            <icon :name="'add-students'" />
            <h1 class="font-bold tracking-wide text-lg">Add Students</h1>
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
            <div class="flex flex-row gap-3 text-tex1">
              <div class="flex flex-col space-y-2">
                <label class="font-semibold">First Name :</label>
                <input
                  v-model="form.first_name"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter first name ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Middle Name :</label>
                <input
                  v-model="form.middle_name"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter middle name ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Last Name :</label>
                <input
                  v-model="form.last_name"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter last name ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Birthday :</label>
                <input
                  v-model="form.birthdate"
                  type="date"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                />
              </div>
            </div>

            <!-- 2nd Row  -->
            <div class="flex flex-row gap-3">
              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Gender :</label>
                <select
                  v-model="form.gender"
                  name="gender"
                  id="gender"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select</option>
                  <option
                    v-for="(gender, index) in availableGender"
                    :key="index"
                    :value="gender"
                  >
                    {{ gender }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Student ID Number :</label>
                <input
                  v-model="form.student_id"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter student id number ..."
                  required
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Status :</label>
                <select
                  v-model="form.status"
                  name="status"
                  id="status"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                >
                  <option value="" class="text-gray-500">Select</option>
                  <option
                    v-for="(status, index) in availableStatus"
                    :key="index"
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Civil Status :</label>
                <select
                  v-model="form.civil_status"
                  name="civil_status"
                  id="civil_status"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select</option>
                  <option
                    v-for="(civil_status, index) in availableCivilStatus"
                    :key="index"
                    :value="civil_status"
                  >
                    {{ civil_status }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- BOTTOM CONTENT  -->
          <!-- 1st Row Content  -->
          <div class="flex justify-between w-full space-x-3">
            <div class="text-gray-700 space-y-4 border p-3 rounded-md w-full">
              <div class="flex flex-col space-y-2">
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

              <!-- 2nd Row Content  -->
              <div class="flex gap-x-4">
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Semester Admitted :</label>
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
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">School Year Admitted :</label>
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
                      ) in avilableSchoolYear"
                      :key="index"
                      :value="school_year_admitted"
                    >
                      {{ school_year_admitted }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- 3rd Row Content  -->
              <div class="flex gap-x-4">
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Current Year Level:</label>
                  <select
                    v-model="form.current_level"
                    name="current_level"
                    id="current_level"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(
                        current_level, index
                      ) in availableCuurentYearLevel"
                      :key="index"
                      :value="current_level"
                    >
                      {{ current_level }}
                    </option>
                  </select>
                </div>
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Educational Level:</label>
                  <select
                    v-model="form.educational_level"
                    name="educational_level"
                    id="educational_level"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(
                        educational_level, index
                      ) in availableEducationalLevel"
                      :key="index"
                      :value="educational_level"
                    >
                      {{ educational_level }}
                    </option>
                  </select>
                </div>
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Enrollment Status:</label>
                  <select
                    v-model="form.enrollment_status"
                    name="enrollment_status"
                    id="enrollment_status"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(
                        enrollment_status, index
                      ) in availableEnrollmentStatus"
                      :key="index"
                      :value="enrollment_status"
                    >
                      {{ enrollment_status }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- 4th Row Content Left -->
              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Enrollment Category:</label>
                <select
                  v-model="form.enrollment_category"
                  name="enrollment_category"
                  id="enrollment_category"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select</option>
                  <option
                    v-for="(
                      enrollment_category, index
                    ) in availbaleenrollmentCategory"
                    :key="index"
                    :value="enrollment_category"
                  >
                    {{ enrollment_category }}
                  </option>
                </select>
              </div>
            </div>
            <!-- 4th Row Content Right  -->
            <div class="text-gray-700 space-y-4 border p-3 rounded-md w-full">
              <div class="flex justify-between w-full">
                <div class="flex gap-2 w-full">
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold">Last School Attended :</label>
                    <input
                      v-model="form.last_school_attended"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter last school attended ..."
                    />
                  </div>
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold"
                      >Address of Last School Attended :</label
                    >
                    <input
                      v-model="form.address_last_school_attended"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter address of last school attended ..."
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-full">
                <div class="flex gap-2 w-full">
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold">LRN :</label>
                    <input
                      v-model="form.lrn"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter lrn ..."
                    />
                  </div>
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold">Course/Strand :</label>
                    <input
                      v-model="form.strand_course"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter course strand ..."
                    />
                  </div>
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold">S.Y. Last Attended :</label>
                    <input
                      v-model="form.s_y_last_attended"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter s.y. attended ..."
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-between w-full">
                <div class="flex gap-2 w-full h-36">
                  <!-- Set a height for the parent -->
                  <div class="flex flex-col space-y-2 flex-1 h-full">
                    <label class="font-semibold">Remarks:</label>
                    <textarea
                      v-model="form.remarks"
                      class="px-3 py-2 border w-full h-full border-gray-300 rounded-md text-gray-700 bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div class="flex flex-col space-y-2 flex-1 h-full">
                    <label class="font-semibold">To Submit:</label>
                    <textarea
                      v-model="form.to_submit"
                      class="px-3 py-2 border w-full h-full border-gray-300 rounded-md text-gray-700 bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
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
import { studentsData } from "../../store/studentsData";
import { toast } from "vue3-toastify";
export default {
  name: "AddStudentsPage",
  components: {
    icon,
  },
  data() {
    return {
      isOpen: true,
      form: {
        student_records_generated_id: "",
        student_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        program_course: "",
        status: "",
        birthdate: "",
        educational_level: "",
        civil_status: "",
        semester: "",
        school_year_admitted: "",
        enrollment_status: "",
        last_school_attended: "",
        address_last_school_attended: "",
        strand_course: "",
        s_y_last_attended: "",
        lrn: "",
        current_level: "",
        enrollment_category: "",
        remarks: "",
        to_submit: "",
        staff: "",
      },
      validationErrors: [],
      showValidationModal: false,
      user: {},
    };
  },

  setup() {
    const libraryStore = studentsData();

    return {
      libraryStore,
      availableGender: libraryStore.getGender,
      availableStatus: libraryStore.getSatus,
      availableCivilStatus: libraryStore.getCivilStatus,
      availableProgramCourse: libraryStore.getProgramCourse,
      availableSemester: libraryStore.getSemester,
      avilableSchoolYear: libraryStore.getSchoolYear,
      availableCuurentYearLevel: libraryStore.getCurrentYearLevel,
      availableEducationalLevel: libraryStore.getEducationalLevel,
      availableEnrollmentStatus: libraryStore.getEnrollmentStatus,
      availbaleenrollmentCategory: libraryStore.getEnrollmentCategory,
    };
  },

  methods: {
    closeAdd() {
      this.isOpen = false;
      this.isSuccessfulAdd = false;
      this.$emit("close");
    },
    generateStudentId() {
      // Retrieve the last stored ID from localStorage or start from 100
      let lastId = localStorage.getItem("lastStudentId");
      let newId = lastId ? parseInt(lastId) + 1 : 100;

      // Store the new ID in localStorage
      localStorage.setItem("lastStudentId", newId);

      return newId.toString(); // Convert to string for consistency
    },
    async submitData() {
      this.form.student_records_generated_id = this.generateStudentId();
      const students_formData = { ...this.form }; // Ensure correct binding
      this.validationErrors = [];

      if (!this.form.first_name)
        this.validationErrors.push("First Name is required.");
      if (!this.form.middle_name)
        this.validationErrors.push("Middle Name is required.");
      if (!this.form.last_name)
        this.validationErrors.push("Last Name is required.");
      if (!this.form.student_id)
        this.validationErrors.push("Student ID is required.");
      if (!this.form.gender) this.validationErrors.push("Gender is required.");
      if (!this.form.program_course)
        this.validationErrors.push("Program/Course is required.");
      if (!this.form.status) this.validationErrors.push("Status is required.");
      if (!this.form.civil_status)
        this.validationErrors.push("Civil Status is required.");
      if (!this.form.semester)
        this.validationErrors.push("Semester is required.");
      if (!this.form.educational_level)
        this.validationErrors.push("Educational Level is required.");
      if (!this.form.enrollment_status)
        this.validationErrors.push("Enrollment Status is required.");
      if (!this.form.enrollment_category)
        this.validationErrors.push("Enrollment Category is required.");

      if (this.validationErrors.length > 0) {
        this.showValidationModal = true;
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/student-records-data/add",
          students_formData
        );
        console.log("API Response:", response.data);
        toast.success("Student record added successfully.");
        this.isOpen = false;
      } catch (error) {
        console.error("Submission failed:", error.response?.data || error);
      }
    },
    resetForm() {
      this.form = {
        student_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        program: "",
        status: "",
        birthdate: "",
        educational_level: "",
        civil_status: "",
        semester: "",
        school_year_admitted: "",
        enrollment_status: "",
        last_school_attended: "",
        address_last_school_attended: "",
        strand_course: "",
        s_y_last_attended: "",
        lrn: "",
        current_level: "",
        enrollment_category: "",
        remarks: "",
        to_submit: "",
      };
    },

    // Fetch the Staff Details
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });

        if (response.data) {
          this.user = response.data;
          this.form.staff = `${this.user.first_name} ${this.user.last_name}`; // ← set staff here
          console.log("RTSM Staff User Details:", this.user);
        } else {
          this.$router.push("/");
          location.reload();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
