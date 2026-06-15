<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center z-50 w-min-screen"
  >
    <div class="rounded-[15px] shadow-lg fixed top-20">
      <div class="w-auto bg-white text-text1 text-[13px] rounded-[15px]">
        <div
          class="w-full p-5 py-2 bg-Green text-white rounded-t-[15px] flex justify-between items-center"
        >
          <div class="flex gap-2 items-center">
            <icon :name="'edit'" />
            <h1 class="font-bold tracking-wide text-lg">
              Edit Student Informations
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
            <div class="flex flex-row gap-3 text-tex1">
              <div class="flex flex-col space-y-2">
                <label class="font-semibold">First Name :</label>
                <input
                  v-model="studentCopy.first_name"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter first name ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Middle Name :</label>
                <input
                  v-model="studentCopy.middle_name"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter middle name ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Last Name :</label>
                <input
                  v-model="studentCopy.last_name"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter last name ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Birthday :</label>
                <input
                  v-model="studentCopy.birthdate"
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
                  v-model="studentCopy.gender"
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
                  v-model="studentCopy.student_id"
                  type="text"
                  class="px-3 py-2 border w-[300px] border-gray-300 rounded-md text-gray-700"
                  placeholder="Enter student id number ..."
                />
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-semibold">Status :</label>
                <select
                  v-model="studentCopy.status"
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
                  v-model="studentCopy.civil_status"
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
                  v-model="studentCopy.program_course"
                  name="program_course"
                  id="program_course"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select</option>
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
                    v-model="studentCopy.semester"
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
                    v-model="studentCopy.school_year_admitted"
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
              </div>

              <!-- 3rd Row Content  -->
              <div class="flex gap-x-4">
                <div class="flex flex-col space-y-2 w-full">
                  <label class="font-semibold">Current Year Level:</label>
                  <select
                    v-model="studentCopy.current_level"
                    name="current_level"
                    id="current_level"
                    class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select</option>
                    <option
                      v-for="(
                        current_level, index
                      ) in availableCurrentYearLevel"
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
                    v-model="studentCopy.educational_level"
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
                    v-model="studentCopy.enrollment_status"
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
                  v-model="studentCopy.enrollment_category"
                  name="enrollment_category"
                  id="enrollment_category"
                  class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select</option>
                  <option
                    v-for="(
                      enrollment_category, index
                    ) in availableEnrollmentCategory"
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
                      v-model="studentCopy.last_school_attended"
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
                      v-model="studentCopy.address_last_school_attended"
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
                      v-model="studentCopy.lrn"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter lrn ..."
                    />
                  </div>
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold">Course/Strand :</label>
                    <input
                      v-model="studentCopy.strand_course"
                      type="text"
                      class="px-3 py-2 border w-full border-gray-300 rounded-md text-gray-700"
                      placeholder="Enter course strand ..."
                    />
                  </div>
                  <div class="flex flex-col space-y-2 flex-1">
                    <label class="font-semibold">S.Y. Last Attended :</label>
                    <input
                      v-model="studentCopy.s_y_last_attended"
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
                      v-model="studentCopy.remarks"
                      class="px-3 py-2 border w-full h-full border-gray-300 rounded-md text-gray-700 bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div class="flex flex-col space-y-2 flex-1 h-full">
                    <label class="font-semibold">To Submit:</label>
                    <textarea
                      v-model="studentCopy.to_submit"
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
              class="bg-gray-500 hover:bg-gray-300 px-5 py-2 rounded-md text-white hover:text-gray-700"
              @click="closeAdd"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import icon from "@/assets/icon.vue";
import { studentsData } from "../../store/studentsData";
import { encryptData, decryptData } from "../../util/cryptoHelper";
import { toast } from "vue3-toastify";
export default {
  props: {
    student: Object,
  },
  components: {
    icon,
  },
  data() {
    return {
      isOpen: true,
      studentCopy: {},
      isSuccessfulAdd: false,
      isLoading: false,
      encryptionKey: "your-very-secure-key",
    };
  },

  setup() {
    const libraryStore = studentsData();
    return {
      availableGender: libraryStore.getGender,
      availableStatus: libraryStore.getSatus,
      availableCivilStatus: libraryStore.getCivilStatus,
      availableProgramCourse: libraryStore.getProgramCourse,
      availableSemester: libraryStore.getSemester,
      availableSchoolYear: libraryStore.getSchoolYear,
      availableCurrentYearLevel: libraryStore.getCurrentYearLevel,
      availableEducationalLevel: libraryStore.getEducationalLevel,
      availableEnrollmentStatus: libraryStore.getEnrollmentStatus,
      availableEnrollmentCategory: libraryStore.getEnrollmentCategory,
    };
  },

  methods: {
    closeAdd() {
      this.isOpen = false;
      this.$emit("close");
    },

    async submitData() {
      this.isLoading = true;
      try {
        if (!this.studentCopy) {
          console.error("❌ No student data to submit.");
          return;
        }

        console.log("📤 Sending Plain Data to API:", this.studentCopy);

        const response = await axios.patch(
          `http://localhost:8000/student-records-data/${this.studentCopy.id}`,
          this.studentCopy,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("📩 API Response:", response.data);

        // Update student data in the component
        this.studentCopy = response.data;

        // Encrypt response data and store it in localStorage
        const encryptedResponseData = encryptData(response.data);
        localStorage.setItem("studentData", encryptedResponseData);
        console.log("✅ Encrypted student data saved to localStorage.");
        // Show success message with a delay
        toast.success("Student information updated successfully."),
          (this.isOpen = false);
        this.$emit("update-student", response.data); // Emit updated data
      } catch (error) {
        console.error("❌ Submission failed:", error.response?.data || error);
      } finally {
        this.isLoading = false;
      }
    },
    loadStudentFromLocalStorage() {
      const storedStudent = localStorage.getItem("studentData");

      if (storedStudent) {
        try {
          console.log(
            "🔒 Encrypted student data from localStorage:",
            storedStudent
          );

          // Ensure data format is correct
          if (!storedStudent.includes(":")) {
            console.error("❌ Incorrectly formatted encrypted data!");
            return;
          }

          // Attempt decryption
          const decryptedData = decryptData(storedStudent);
          console.log("✅ Decrypted student data:", decryptedData);

          // Load into studentCopy
          this.studentCopy = decryptedData;
        } catch (error) {
          console.error("❌ Failed to decrypt student data:", error);
        }
      }
    },
  },

  watch: {
    student: {
      handler(newVal) {
        if (newVal) {
          this.studentCopy = { ...newVal };
        }
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    this.loadStudentFromLocalStorage();
  },
};
</script>
