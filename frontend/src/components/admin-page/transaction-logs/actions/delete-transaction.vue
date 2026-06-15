<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-screen"
  >
    <div
      class="rounded-xl shadow-lg w-[300px] md:w-[400px] bg-white py-6 px-4 flex flex-col items-center absolute top-24 font-poppins"
    >
      <!-- Icon -->
      <div
        class="rounded-full w-16 h-16 md:w-20 md:h-20 flex justify-center items-center bg-red-300 animate-pulse"
      >
        <icon
          name="question"
          class="w-8 h-8 md:w-10 md:h-10 text-white flex justify-center items-center"
        />
      </div>

      <!-- Title -->
      <h1 class="text-[14px] md:text-[16px] font-semibold mt-4">
        Delete Confirmation
      </h1>
      <p class="mt-2 text-[12px] md:text-[13px]">
        Are you sure you want to delete {{ transaction.first_name }}
        {{ transaction.last_name }}?
      </p>
      <!-- Break Line  -->
      <div class="w-full h-[1px] rounded-md bg-gray-200 mt-4"></div>
      <!-- Buttons  -->
      <div class="tracking-wide flex gap-2 mt-4">
        <button
          class="bg-red-400 p-2 px-3 text-[11px] md:text-[13px] rounded-md text-white hover:bg-white border hover:border-red-800 hover:text-red-800 hover:shadow-md"
          @click="closeModal"
        >
          No, Cancel
        </button>
        <button
          class="bg-green-400 p-2 px-3 text-[11px] md:text-[13px] rounded-md text-white hover:bg-white border hover:border-green-800 hover:text-green-800 hover:shadow-md"
          @click="toggleDeleteData"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>

  <div v-if="isDeleted"><transactionConfirmedDelete /></div>
</template>

<script>
import axios from "axios";
import icon from "@/assets/icon.vue";
import transactionConfirmedDelete from "../alert/transaction-confirmed-delete.vue";

export default {
  name: "DeleteConfirmationPage",
  components: {
    icon,
    transactionConfirmedDelete,
  },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: true,
      isDeleted: false,
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    async toggleDeleteData() {
      try {
        await axios.delete(
          `http://localhost:8000/transaction-logs-data/${this.transaction.id}`
        );

        this.isDeleted = true;

        this.isOpen = false;
      } catch (error) {
        console.error("Error deleting student record:", error);
      }
    },
  },
};
</script>
