<template>
  <div
    class="w-full max-h-full h-[85vh] overflow-auto scrollbar-thin px-4 mt-2"
  >
    <div class="flex justify-between py-3">
      <h1 class="font-semibold tracking-wide">Student Information</h1>
      <router-link
        to="student-records"
        class="gap-1 px-2 py-1 text-[13px] rounded-md border border-red-300 flex items-center hover:text-red-700 hover:bg-red-300 text-red-500 hover:scale-105 transition duration-300"
      >
        <icon :name="'back1'"></icon>
        Back
      </router-link>
    </div>
    <div class="text-[14px] mt-1">
      <div class="overflow-x-auto rounded-md">
        <div class="text-gray-700 flex items-start w-full gap-5">
          <div class="w-full flex flex-col gap-2">
            <div
              class="bg-white w-[1000px] max-h-full h-[77vh] p-6 rounded-md shadow border"
            >
              <!-- CONTENT 01 -->
              <div class="flex justify-between">
                <h1 class="text-[14px] font-bold mt-3 flex items-center gap-2">
                  {{ uppercaseName }},
                  <p
                    class="w-auto p-2 flex items-center h-[20px] text-center rounded-full text-[10px] font-bold"
                    :class="{
                      'text-red-700 bg-red-200': student?.status === 'STOPPED',
                      'text-blue-700 bg-blue-200':
                        student?.status === 'GRADUATE',
                    }"
                  >
                    {{ student?.status || "N/A" }}
                  </p>
                </h1>
                <div class="flex flex-row gap-2">
                  <button
                    class="p-2 py-1 bg-green-500 hover:bg-green-300 text-white hover:text-green-700 rounded-md flex gap-1"
                    @click="toggleEditStudentInformation(student)"
                  >
                    <icon name="edit" />
                  </button>
                  <button
                    class="p-2 py-1 bg-blue-500 hover:bg-blue-300 hover:text-blue-700 text-white rounded-md flex gap-1"
                  >
                    <icon name="printer" />
                  </button>
                </div>
              </div>
              <!-- !Informations  -->
              <div class="flex justify-between mt-2">
                <div class="text-[12px] mt-7 text-left flex flex-col gap-5">
                  <!-- !First Col  -->
                  <div>
                    <h1>Birthday:</h1>
                    <p class="font-bold">{{ student?.birthdate || "N/A" }}</p>
                  </div>
                  <div>
                    <h1>Year Level:</h1>
                    <p class="font-bold">
                      {{ student?.current_level || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <h1>Educational Level:</h1>
                    <p class="font-bold">
                      {{ student?.educational_level || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <h1>Civil Status:</h1>
                    <p class="font-bold">
                      {{ student?.civil_status || "N/A" }}
                    </p>
                  </div>
                </div>
                <!-- !Second Col  -->
                <div
                  class="text-[12px] mt-7 text-left flex flex-col gap-5 mr-36"
                >
                  <div>
                    <h1>Gender:</h1>
                    <p class="font-bold">{{ student?.gender || "N/A" }}</p>
                  </div>
                  <div>
                    <h1>Semester and School Year Admitted:</h1>
                    <p class="font-bold">{{ student?.semester || "N/A" }}</p>
                  </div>
                  <div>
                    <h1>Enrollment Status:</h1>
                    <p class="font-bold">
                      {{ student?.enrollment_status || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <h1>LRN:</h1>
                    <p class="font-bold">{{ student?.lrn || "N/A" }}</p>
                  </div>
                </div>
              </div>

              <!-- !Break lines  -->
              <div class="w-full h-[1px] bg-[#F6F6F6] mt-5"></div>
              <!-- !End Break lines  -->
              <div class="flex justify-between mr-[104px]">
                <div class="text-[12px] mt-7 text-left flex flex-col gap-5">
                  <!-- !First Col  -->
                  <div>
                    <h1>Last School Attended:</h1>
                    <p class="font-bold">
                      {{ student?.last_school_attended || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <h1>Last School Address:</h1>
                    <p class="font-bold">
                      {{ student?.address_last_school_attended || "N/A" }}
                    </p>
                  </div>
                </div>
                <div
                  class="text-[12px] mt-7 text-left flex flex-col gap-5 mr-36"
                >
                  <div>
                    <h1>Strand Course:</h1>
                    <p class="font-bold">
                      {{ student?.strand_course || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <h1>S.Y. Last Attended:</h1>
                    <p class="font-bold">
                      {{ student?.s_y_last_attended || "N/A" }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- !Break lines  -->
              <div class="w-full h-[1px] bg-[#F6F6F6] mt-5"></div>
              <!-- !End Break lines  -->
              <!-- !Additional Requirements Submitted -->
              <div class="border-blue-300 border rounded-md p-4 mt-2">
                <div class="flex justify-between items-center">
                  <div class="flex gap-1 text-blue-500">
                    <icon :name="'additional-requirements'" />
                    <h1 class="font-semibold tracking-wide text-[14px]">
                      Additional Requirements Submitted
                    </h1>
                  </div>
                  <div
                    class="bg-blue-500 py-1 p-2 text-white flex rounded-md gap-1 hover:bg-blue-300 hover:text-blue-700 font-semibold cursor-pointer"
                    @click="toggleAdditionalRequirements"
                  >
                    <icon :name="'add-account'" />
                  </div>
                </div>
                <!-- TABLE OF ADDITIONAL REQUIREMENTS  -->
                <tableAdditionalRequirements />
              </div>
            </div>

            <!-- FOR CANCELLATION  -->
            <!-- <div class="bg-white w-full rounded-md shadow p-6 border">
              <div class="flex justify-between items-center">
                <div class="flex gap-1 text-orange-500">
                  <icon :name="'circle-close3'" />
                  <h1 class="font-semibold tracking-wide">Cancellation</h1>
                </div>
                <button
                  class="p-2 py-1 bg-orange-400 hover:bg-orange-300 text-white hover:text-orange-700 rounded-md flex gap-1"
                  @click="toggleAddStudentLogHistory"
                >
                  <icon name="add-account" />
                </button>
              </div>
       
              <tableLogHistory class="mt-2" />
            </div> -->
          </div>

          <!-- CONTENT 02 -->
          <div class="flex flex-col w-full gap-2">
            <div class="bg-white w-full rounded-md shadow border p-6">
              <div class="flex justify-between items-center">
                <h1 class="font-semibold tracking-wide">
                  Documents/Records Submitted
                </h1>
                <button
                  class="p-2 py-1 bg-green-500 hover:bg-green-300 text-white hover:text-green-700 rounded-md flex gap-1"
                  @click="toggleDocumentsSubmitted"
                >
                  <icon name="edit" />
                </button>
              </div>
              <!-- TABLE FOR DOCUMENTS SUBMITTED -->
              <tableDocument_submitted />
            </div>

            <!-- CONTENT 03  -->
            <div class="bg-white w-full rounded-md shadow p-6">
              <div class="flex justify-between items-center">
                <div class="flex gap-1 text-green-500">
                  <icon :name="'time'" />
                  <h1 class="font-semibold tracking-wide">Log History</h1>
                </div>
                <button
                  class="p-2 py-1 bg-green-400 hover:bg-green-300 text-white hover:text-green-700 rounded-md flex gap-1"
                  @click="toggleAddStudentLogHistory"
                >
                  <icon name="add-account" />
                </button>
              </div>
              <!-- TABLE FOR DOCUMENTS SUBMITTED -->
              <tableLogHistory class="mt-2" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="isDeleteAddtionalDocument"><Delete /></div>
      <div v-if="isDocumentSubmitted"><documentsSubmitted /></div>
      <div v-if="isAdditionalRequirements"><AdditionalRequirements /></div>
      <div v-if="isAddStudentLogHistory"><AddStudentLogHistory /></div>
      <div v-if="isEdit">
        <studentEdit
          :student="selectedStudent"
          @update-student="handleStudentUpdate"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/assets/icon.vue";
import documentsSubmitted from "../modal/add-student-documents-submitted.vue";
import AdditionalRequirements from "../modal/add-student-additional-requirements.vue";
import AddStudentLogHistory from "../modal/add-student-log-history.vue";
import Delete from "./delete-student.vue";
import studentEdit from "../modal/edit-student-edit.vue";
import tableDocument_submitted from "../tables/table-document_submitted.vue";
import tableAdditionalRequirements from "../tables/table-additional-requirements.vue";
import tableLogHistory from "../tables/table-log-history.vue";
import { encryptData, decryptData } from "../../util/cryptoHelper";
import { studentsData } from "../../store/studentsData";
export default {
  components: {
    Icon,
    documentsSubmitted,
    AdditionalRequirements,
    Delete,
    studentEdit,
    tableDocument_submitted,
    tableAdditionalRequirements,
    tableLogHistory,
    AddStudentLogHistory,
  },
  computed: {
    student() {
      const store = studentsData();
      const studentFromLocalStorage = localStorage.getItem("studentData");

      if (studentFromLocalStorage) {
        try {
          const decryptedStudent = decryptData(studentFromLocalStorage);
          console.log("Decrypted student data (computed):", decryptedStudent);
          return decryptedStudent;
        } catch (error) {
          console.error("Error decrypting student data (computed):", error);
          return null;
        }
      }

      return store.selectedStudent;
    },

    uppercaseName() {
      if (!this.student || !this.student.first_name) return "N/A";
      return `${this.student.first_name.toUpperCase() || ""}
       ${
         this.student.middle_name
           ? this.student.middle_name.toUpperCase() + " "
           : ""
       }
       ${this.student.last_name?.toUpperCase() || ""}`.trim();
    },
  },

  data() {
    return {
      documents: [{ name: "Medical Certificate" }, { name: "Report Card" }],
      isDocumentSubmitted: false,
      isAdditionalRequirements: false,
      isAddStudentLogHistory: false,
      isDeleteAddtionalDocument: false,
      isConfirmedSubmitted: false,
      isEdit: false,
    };
  },

  methods: {
    toggleAddStudentLogHistory() {
      this.isAddStudentLogHistory = !this.isAddStudentLogHistory;
    },
    toggleDocumentsSubmitted() {
      this.isDocumentSubmitted = !this.isDocumentSubmitted;
    },
    toggleAdditionalRequirements() {
      this.isAdditionalRequirements = !this.isAdditionalRequirements;
    },
    toggleDeleteAdditionalDocument() {
      this.isDeleteAddtionalDocument = !this.isDeleteAddtionalDocument;
    },
    toggleEditStudentInformation() {
      const studentsDataStore = studentsData();
      studentsDataStore.setStudent(this.student);

      // Encrypt student data before storing
      const encryptedData = encryptData(this.student);
      localStorage.setItem("studentData", encryptedData);

      this.isEdit = !this.isEdit;
    },
  },
  handleStudentUpdate(updatedStudent) {
    const index = this.students.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
    localStorage.setItem("students", JSON.stringify(this.students));
  },
  fetchStudentData() {
    const studentFromLocalStorage = localStorage.getItem("studentData");

    if (studentFromLocalStorage) {
      try {
        const decryptedStudent = decryptData(studentFromLocalStorage); // Decrypt the stored data
        this.student = decryptedStudent;
      } catch (error) {
        console.error("Error decrypting student data:", error);
      }
    }
  },
  mounted() {
    window.addEventListener("storage", this.fetchStudentData);
  },
  beforeUnmount() {
    // Cleanup event listener
    window.removeEventListener("storage", this.fetchStudentData);
  },
};
</script>
