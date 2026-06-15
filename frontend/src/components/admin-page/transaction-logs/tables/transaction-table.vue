<template>
  <div v-if="isTable">
    <div class="text-sm flex justify-between">
      <div class="text-[13px] text-text mt-4 font-regular">
        Pages / Transaction Logs
      </div>
      <div class="flex gap-2">
        <button
          class="flex gap-2 items-center bg-blue-700 text-white hover:text-blue-700 p-3 py-2 rounded-md hover:bg-blue-300 hover:shadow-lg"
          @click="toggleGenerate"
        >
          <icon :name="'printer'"></icon>Generate
        </button>
        <button
          class="flex gap-2 items-center bg-Green text-white hover:text-green-700 p-3 py-2 rounded-md hover:bg-green-300 hover:shadow-lg"
          @click="toggleAdd"
        >
          <icon :name="'add-docs'"></icon>Add Transaction
        </button>
      </div>
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
              class="min-w-full border-collapse table-auto text-text text-[13px]"
            >
              <thead
                class="bg-Green text-white tracking-wider font-regular sticky top-0 z-10"
              >
                <tr>
                  <th class="px-4 py-3 text-left border-b whitespace-nowrap">
                    ID
                  </th>
                  <th class="px-4 py-3 text-left border-b w-[200px]">
                    Student's Name
                  </th>
                  <th class="px-4 py-3 text-left border-b w-10">Course/Year</th>
                  <th class="px-4 py-3 text-left border-b w-auto">
                    Purpose of Transaction
                  </th>
                  <th class="px-4 py-3 text-left border-b w-[150px]">Status</th>
                  <th class="px-4 py-3 text-left border-b w-[350px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in paginatedData"
                  :key="item.id"
                  :class="{ 'bg-gray-50': (index + 1) % 2 === 0 }"
                >
                  <td class="px-4 py-2 text-left border-b whitespace-nowrap">
                    {{ startIndex + index }}
                  </td>

                  <td class="px-4 py-2 text-left border-b whitespace-nowrap">
                    {{
                      item.first_name +
                      " " +
                      (item.middle_name ? item.middle_name + " " : "") +
                      item.last_name
                    }}
                  </td>

                  <td class="px-4 py-2 text-left border-b whitespace-nowrap">
                    {{ item.program_course }}, {{ item.school_year_admitted }}
                  </td>

                  <td class="px-4 py-2 text-left border-b whitespace-nowrap">
                    {{ item.purpose_of_transaction }}
                  </td>

                  <td class="px-4 py-1 border-b text-left whitespace-nowrap">
                    <p
                      :class="{
                        'text-red-700 bg-red-200': item.status === 'PENDING',
                        'text-yellow-400 bg-yellow-100':
                          item.status === 'PROCESSING',
                        'text-blue-700 bg-blue-200':
                          item.status === 'ON PROCESS',
                        'text-violet-700 bg-violet-200':
                          item.status === 'PROCESSED',
                        'text-green-700 bg-green-200':
                          item.status === 'COMPLETED',
                        'text-amber-700 bg-amber-200':
                          item.status === 'PROCESSING',
                      }"
                      class="text-[10px] w-[90px] rounded-full px-1 py-1 font-semibold text-center tracking-wider"
                    >
                      {{ item.status }}
                    </p>
                  </td>

                  <td class="px-4 py-2 border-b text-left whitespace-nowrap">
                    <div class="flex gap-1 items-center flex-wrap">
                      <router-link
                        to="transaction-view"
                        class="p-2 py-1 h-8 border-2 border-blue-200 hover:bg-blue-300 text-blue-700 rounded-lg flex gap-1 items-center"
                        @click="toggleViewOpen(item)"
                      >
                        <icon name="eye" /> View
                      </router-link>

                      <button
                        class="p-2 py-1 h-8 border-2 text-green-700 border-green-200 hover:bg-green-300 rounded-lg flex gap-1 items-center"
                        @click="toggleEditTransactionInfomation(item)"
                      >
                        <icon name="edit" /> Edit
                      </button>

                      <button
                        class="p-2 py-1 h-8 border-2 text-orange-700 border-orange-200 hover:bg-orange-300 rounded-lg flex gap-1 items-center"
                        @click="toggleLogHistory"
                      >
                        <icon name="printer" /> Print
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
                class="px-3 py-1 mx-1 rounded-md hover:bg-green-200"
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
    <div v-if="isAdd"><transactionAdd @close="closeView" /></div>

    <div v-if="isViewOpen">
      <transactionView :transaction="selectedTransaction" @close="closeView" />
    </div>
    <div v-if="isDeleteConfitmation">
      <transactionDelete
        :transaction="selectedTransaction"
        @close="closeView"
      />
    </div>
    <div v-if="isEdit">
      <transactionEdit
        :transaction="selectedTransaction"
        @update-student="handleStudentUpdate"
        @close="closeView"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { transactionsData } from "../../store/transactionsData";
import { encryptData } from "../../util/cryptoHelper";
import icon from "@/assets/icon.vue";
import transactionAdd from "../modal/add-transaction.vue";
import transactionView from "../actions/view-transaction.vue";
import transactionDelete from "../actions/delete-transaction.vue";
import transactionEdit from "../modal/edit-transaction.vue";
export default {
  name: "TransactionTablePage",
  components: {
    icon,
    transactionAdd,
    transactionView,
    transactionDelete,
    transactionEdit,
  },
  data() {
    return {
      isAdd: false,
      isCancellation: false,
      isDeleteConfitmation: false,
      items: [],
      isViewOpen: false,
      isTable: true,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
      isEdit: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    pageNumbers() {
      const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      const chunkSize = 5;
      const start = Math.floor((this.currentPage - 1) / chunkSize) * chunkSize;
      const end = Math.min(start + chunkSize, this.totalPages);

      return pages.slice(start, end);
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
    toggleDelete(transaction) {
      this.selectedTransaction = transaction;
      this.isDeleteConfitmation = !this.isDeleteConfitmation;
    },
    setItemData(item) {
      const store = transactionsData();
      store.setItem(item);
    },
    toggleCancellation(student) {
      this.selectedStudent = student;
      this.isCancellation = true;
    },
    toggleViewOpen(transaction) {
      this.isViewOpen = true;
      this.isTable = false;
      const transactionDataStore = transactionsData();
      this.selectedTransaction = transaction;
      transactionDataStore.setTransaction(this.selectedTransaction);

      const encryptedData = encryptData(this.selectedTransaction);
      localStorage.setItem("transactionData", encryptedData);
    },
    closeView() {
      this.isViewOpen = false;
      this.isCancellation = false;
      this.isDeleteConfitmation = false;
      this.isAdd = false;
      this.isEdit = false;
      this.isTable = true;
    },

    toggleEditTransactionInfomation(transaction) {
      this.isEdit = !this.isEdit;
      const transactionDataStore = transactionsData();
      this.selectedTransaction = transaction;
      transactionDataStore.setTransaction(this.selectedTransaction);

      // Encrypt transaction data before storing in local storage
      const encryptedData = encryptData(this.selectedTransaction);
      localStorage.setItem("transactionData", encryptedData);
    },

    // Fetching of Transaction Logs Data
    async fetchTransactionLogsData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/transaction-logs-data/get-transaction-logs"
        );
        this.items = response.data;
        const studentsTransactionStore = transactionsData();
        studentsTransactionStore.setTransaction(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    },

    startAutoRefresh() {
      if (!this.refreshInterval) {
        this.refreshInterval = setInterval(() => {
          this.fetchTransactionLogsData();
        }, 2000);
      }
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    },
  },
  mounted() {
    this.fetchTransactionLogsData();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
};
</script>
