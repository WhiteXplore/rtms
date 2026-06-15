import { defineStore } from "pinia";

export const transactionsData = defineStore("transactions", {
  state: () => ({
    availableTransactionStatus: [
      "PROCESSING",
      "ON PROCESS",
      "PROCESSED",
      "COMPLETED",
      "READY FOR CLAIM",
    ],
    availableProgramCourse: [
      "Bachelor of Science in Information Technology",
      "Bachelor of Education",
    ],
    availableSchoolYear: ["2024-2025"],
    availableSemester: ["1st Semester"],
    availablePurpose: ["Study Abroad", "To submit requirements"],
    selectedTransaction: null,
    transaction: [],
  }),
  getters: {
    getTransactionStatus: (state) => state.availableTransactionStatus,
    getProgramCourse: (state) => state.availableProgramCourse,
    getSchoolYear: (state) => state.availableSchoolYear,
    getPurpose: (state) => state.availablePurpose,
    getSemester: (state) => state.availableSemester,
  },

  actions: {
    setItem(item) {
      this.selectedTransaction = item;
    },
    setTransaction(transaction) {
      this.selectedTransaction = transaction; // You can set selected student here
    },
    setTransactions(transaction) {
      this.transaction = transaction; // Store the full list of students
    },
  },
});
