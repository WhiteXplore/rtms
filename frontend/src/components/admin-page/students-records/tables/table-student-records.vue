<template>
  <div v-if="isTable">
    <div class="text-sm flex justify-between">
      <div class="text-[13px] text-text mt-4 font-regular">
        Pages / Student Records
      </div>
      <button
        class="flex gap-1 items-center bg-Green text-white hover:text-green-700 p-3 py-2 rounded-md hover:bg-green-300 hover:shadow-lg"
        @click="toggleAdd"
      >
        <icon :name="'add-students'"></icon>Add Students
      </button>
    </div>

    <div class="text-[14px] bg-white rounded-xl">
      <div class="mt-4 overflow-x-auto border p-2 rounded-xl">
        <div class="text-gray-700 flex justify-between items-center mt-1">
          <!-- Items Per Page Dropdown -->
          <div class="flex items-center">
            <select
              v-model="itemsPerPage"
              class="px-1 py-1 border rounded-md"
              @change="changePage(1)"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <span class="ml-2">Per page</span>
          </div>

          <!-- Search Bar -->
          <div class="flex items-center">
            <input
              v-model="searchQuery"
              type="text"
              class="px-3 w-[300px] py-3 border rounded-md"
              placeholder="Search..."
              @input="changePage(1)"
            />
          </div>
        </div>

        <div class="w-full mt-3 rounded-t-lg overflow-x-auto">
          <div class="overflow-y-auto max-h-[550px]">
            <table
              class="min-w-full table-fixed border-collapse text-text text-[13px]"
            >
              <thead
                class="bg-Green text-white tracking-wider font-regular sticky top-0 z-10"
              >
                <tr>
                  <th
                    class="w-[50px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    ID
                  </th>
                  <th
                    class="w-[100px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    Student ID
                  </th>
                  <th
                    class="w-[180px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    Student's Name
                  </th>
                  <th
                    class="w-[300px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    Program
                  </th>
                  <th
                    class="w-[100px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    Year Level
                  </th>
                  <th
                    class="w-[100px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    class="w-[50px] px-2 py-3 text-left border-b whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in paginatedData"
                  :key="item.id"
                  :class="{ 'bg-green-50 border-b': (index + 1) % 2 === 0 }"
                >
                  <td class="px-2 py-1 text-left border-b whitespace-nowrap">
                    {{ startIndex + index }}
                  </td>
                  <td class="px-2 py-1 text-left border-b whitespace-nowrap">
                    {{ item.student_id }}
                  </td>
                  <td class="px-2 py-1 text-left border-b whitespace-nowrap">
                    {{
                      item.first_name +
                      " " +
                      (item.middle_name ? item.middle_name + " " : "") +
                      item.last_name
                    }}
                  </td>
                  <td class="px-2 py-1 text-left border-b whitespace-nowrap">
                    {{ item.program_course }}
                  </td>
                  <td class="px-2 py-1 text-left border-b whitespace-nowrap">
                    {{ item.current_level }}
                  </td>
                  <td class="px-2 py-1 border-b text-left whitespace-nowrap">
                    <p
                      :class="{
                        'text-red-700 bg-red-200': item.status === 'STOPPED',
                        'text-blue-700 bg-blue-200': item.status === 'GRADUATE',
                      }"
                      class="text-[10px] w-[70px] rounded-full px-1 py-1 font-semibold text-center tracking-wider"
                    >
                      {{ item.status }}
                    </p>
                  </td>
                  <td class="px-2 py-2 border-b text-left whitespace-nowrap">
                    <div class="flex gap-1 items-center">
                      <router-link
                        to="students-views"
                        class="p-2 py-1 h-8 border-2 border-blue-200 hover:bg-blue-300 text-blue-700 rounded-lg flex gap-1 items-center"
                        @click="toggleViewOpen(item)"
                      >
                        <icon name="eye" />View
                      </router-link>
                      <button
                        class="p-2 py-1 h-8 border-2 border-orange-200 hover:bg-orange-400 text-orange-700 rounded-lg flex gap-1 items-center"
                        @click="toggleCancellation(item)"
                      >
                        <icon name="circle-close" /> Cancellation
                      </button>
                      <button
                        class="p-2 py-1 h-8 border-2 border-green-200 hover:bg-green-300 text-green-700 rounded-lg flex gap-1 items-center"
                        @click="toggleLogHistory(item)"
                      >
                        <icon name="delete" /> History
                      </button>
                      <button
                        class="p-2 py-1 h-8 border-2 border-red-200 hover:bg-red-300 text-red-700 rounded-lg flex gap-1 items-center"
                        @click="toggleDelete(item)"
                      >
                        <icon name="delete" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-4">
          <div class="text-gray-700">
            <span>
              Showing {{ startIndex }} to {{ endIndex }} of
              {{ filteredData.length }} entries
            </span>
          </div>
          <div class="flex items-center justify-center mt-4">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400"
            >
              &lt;
            </button>
            <span v-for="page in pageNumbers" :key="page">
              <button
                @click="changePage(page)"
                :class="{
                  'bg-Green text-white': currentPage === page,
                  'bg-gray-200 text-gray-700': currentPage !== page,
                }"
                class="px-3 py-1 mx-1 rounded-md hover:bg-green-300"
              >
                {{ page }}
              </button>
            </span>
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isViewOpen">
    <studentsRecordsView :student="selectedStudent" @close="closeView" />
  </div>
  <div v-if="isAdd"><studentRecordsAdd @close="closeView" /></div>
  <div v-if="isCancellation">
    <student_cancellation :student="selectedStudent" @close="closeView" />
  </div>
  <div v-if="isDeleteConfirmation">
    <Delete :student="selectedStudent" @close="closeView" />
  </div>
  <div v-if="isLogHistory">
    <historyStudent @close="closeView" />
  </div>
</template>

<script>
import { studentsData } from "../../store/studentsData";
import axios from "axios";
import icon from "@/assets/icon.vue";
import studentsRecordsView from "../actions/view-student.vue";
import studentRecordsAdd from "../modal/add-student-add.vue";
import student_cancellation from "../actions/cancel-student.vue";
import historyStudent from "../actions/history-student.vue";
import Delete from "../actions/delete-student.vue";
import { encryptData } from "../../util/cryptoHelper";
export default {
  name: "StudentRecordsTable",
  components: {
    icon,
    studentsRecordsView,
    studentRecordsAdd,
    student_cancellation,
    Delete,
    historyStudent,
  },
  data() {
    return {
      isAdd: false,
      isCancellation: false,
      isDeleteConfirmation: false,
      items: [],
      isViewOpen: false,
      isTable: true,
      currentPage: 1,
      itemsPerPage: 5,
      searchQuery: "",
      isLogHistory: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
    filteredData() {
      return this.searchQuery
        ? this.items.filter((item) =>
            Object.values(item).some((value) =>
              value
                ?.toString()
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            )
          )
        : this.items;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endIndex() {
      return Math.min(
        this.currentPage * this.itemsPerPage,
        this.filteredData.length
      );
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    toggleAdd() {
      this.isAdd = !this.isAdd;
    },
    toggleDelete(student) {
      this.selectedStudent = student;
      this.isDeleteConfirmation = !this.isDeleteConfirmation;
    },
    toggleCancellation(student) {
      this.selectedStudent = student;
      this.isCancellation = true;
    },
    setItemData(item) {
      const store = studentsData(); // Get the Pinia store instance
      store.setItem(item); // Set the item in the store
    },
    toggleViewOpen(student) {
      const encryptedStudent = encryptData(student); // Encrypt student data
      localStorage.setItem("studentData", encryptedStudent); // Store in localStorage
      this.isViewOpen = true; // Open the view
      this.isTable = false; // Hide table
    },
    toggleLogHistory(student) {
      this.isLogHistory = !this.isLogHistory; // Toggle log history view
      const encryptedStudent = encryptData(student); // Encrypt student data
      localStorage.setItem("studentData", encryptedStudent); // Store in localStorag
    },
    closeView() {
      this.isViewOpen = false;
      this.isCancellation = false;
      this.isLogHistory = false;
      this.isDeleteConfirmation = false;
      this.isAdd = false;
      this.isTable = true;
    },

    // Fetching of Student Records Data
    async fetchStudentRecordsData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/student-records-data/data"
        );
        this.items = response.data; // Set the fetched data in the component
        const studentsDataStore = studentsData(); // Get the store instance
        studentsDataStore.setStudents(response.data); // Store students in the Pinia store
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    },
    startAutoRefresh() {
      this.refreshInterval = setInterval(() => {
        this.fetchStudentRecordsData(); // Fetch new data without refreshing the page
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
    this.fetchStudentRecordsData();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
};
</script>
