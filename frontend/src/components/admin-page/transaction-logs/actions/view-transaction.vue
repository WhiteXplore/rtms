<template>
  <div class="px-4 py-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="font-semibold tracking-wide text-lg">Transaction Tracker</h1>
      <router-link
        to="/transaction-logs"
        class="gap-1 px-2 py-1 text-[13px] rounded-md border border-red-300 flex items-center hover:text-red-700 hover:bg-red-300 text-red-500 hover:scale-105 transition duration-300"
      >
        <icon :name="'back1'" />
        Back
      </router-link>
    </div>

    <!-- Main Card -->
    <div
      class="mt-3 w-full min-h-screen rounded-xl bg-white shadow-md border text-[14px]"
    >
      <!-- {{ transaction }} -->
      <div class="p-6 text-text">
        <div class="flex justify-between px-2">
          <h2 class="font-bold">
            Requestor Name:
            <span class="font-regular">{{
              transaction
                ? `${transaction.last_name} ${transaction.first_name} ${transaction.middle_name}`
                : "Loading..."
            }}</span>
          </h2>

          <h2>
            Date Requested:
            <span class="font-bold">{{
              formatDate(transaction ? transaction.created_at : null)
            }}</span>
          </h2>
        </div>
        <div class="flex justify-between items-start mt-2 transaction-wider">
          <!-- Documents Requested -->
          <div class="flex flex-col w-1/2 p-2">
            <label class="font-medium">Document Requested:</label>
            <div class="inline-block bg-green-50 p-3 rounded mt-2">
              <div class="grid grid-cols-2 gap-1 text-sm list-disc pl-5">
                <template
                  v-if="
                    transaction &&
                    transaction.documents &&
                    transaction.documents.length
                  "
                >
                  <div
                    v-for="doc in transaction.documents"
                    :key="doc.id"
                    class="list-item"
                  >
                    {{ doc.document }} ({{ doc.document_copies }} copies)
                  </div>
                </template>
                <div v-else>No documents available.</div>
              </div>
            </div>
          </div>
          <!-- Purpose of Transaction -->
          <div class="flex flex-col w-1/2 p-2">
            <label class="font-medium">Purpose of Transaction:</label>
            <div class="inline-block bg-red-50 p-3 rounded mt-2">
              <div>
                {{
                  transaction
                    ? transaction.purpose_of_transaction
                    : "Loading..."
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Content  -->
      <div class="mt-5">
        <!-- Step Labels -->
        <div class="flex justify-between">
          <div v-for="step in steps" :key="step.id" class="text-center w-full">
            <p
              class="text-xs mb-1"
              :class="step.completed ? 'text-green-600' : 'text-blue-300'"
            >
              {{
                step.completed ? `Completed on ${step.timestamp}` : "Pending"
              }}
            </p>
            <h3 class="text-sm text-text tracking-wide font-semibold">
              {{ step.name }}
            </h3>
          </div>
        </div>

        <!-- Dashed Progress Line -->
        <div class="relative mt-1 h-10 px-16">
          <div
            class="absolute inset-0 border-b-2 border-dashed border-gray-300 w-full"
          ></div>
          <div class="absolute inset-0 mt-6 flex justify-center gap-[390px]">
            <div
              v-for="step in steps"
              :key="step.id"
              class="w-7 h-7 rounded-full flex items-center justify-center text-sm"
              :class="
                step.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-text'
              "
            >
              <span v-if="step.completed"><icon name="check" /></span>
              <span v-else><icon name="minus" /></span>
            </div>
          </div>
        </div>

        <!-- Mark as Completed Buttons -->
        <div class="mt-10 flex justify-center w-full space-x-[335px]">
          <div
            v-for="step in steps"
            :key="step.id"
            class="flex flex-col items-center"
          >
            <button
              v-if="!step.completed"
              class="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              @click="openModal(step)"
            >
              Receive
            </button>
            <div v-else class="px-4 py-2 text-white rounded-md text-sm">
              Receive
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <!-- <div
          class="flex justify-between px-6 lg:px-32 mt-12 text-sm font-medium"
        >
          <h1>Document Requested:</h1>
          <h1>Remarks:</h1>
          <h1>Release Date:</h1>
        </div> -->
      </div>
    </div>

    <!-- Tracker Section -->

    <!-- Step Completion Modals -->
    <template v-for="step in steps" :key="`modal-${step.id}`">
      <div
        v-if="activeModal === step.id"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-auto">
          <h2 class="text-lg font-semibold mb-2">Confirm Completion</h2>
          <p class="text-sm">
            Are you sure you want to mark "{{ step.name }}" as completed?
          </p>
          <div class="flex justify-end gap-2 mt-4">
            <button
              class="px-4 py-2 bg-gray-400 text-white rounded-md text-sm"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              @click="markStepCompleted(step)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useTransactionStore } from "../store/transaction-store";
import icon from "@/assets/icon.vue";
import { decryptData } from "../../util/cryptoHelper";
export default {
  components: { icon },

  setup() {
    const transactionStore = useTransactionStore();
    const steps = computed(() => transactionStore.steps);
    const isOpenReturn = ref(false);
    const activeModal = ref(null);
    const transaction = ref(null);
    // Function to mark a specific step as completed
    const markStepCompleted = (step) => {
      transactionStore.markStepCompleted(step.id);
      console.log(`Step Completed: ${step.name} (ID: ${step.id})`);
      closeModal(); // Close modal after marking as complete
    };

    const openModal = (step) => {
      activeModal.value = step.id;
    };

    const closeModal = () => {
      activeModal.value = null;
    };

    const toggleOpenReturn = () => {
      isOpenReturn.value = !isOpenReturn.value;
    };

    const fetchTransactionData = () => {
      const transactionFromLocalStorage =
        localStorage.getItem("transactionData");
      if (transactionFromLocalStorage) {
        try {
          const decryptedTransaction = decryptData(transactionFromLocalStorage); // Decrypt the stored data
          transaction.value = decryptedTransaction;
        } catch (error) {
          console.error("Error decrypting transaction data:", error);
        }
      }
    };

    onMounted(() => {
      fetchTransactionData();
      window.addEventListener("transaction storage", fetchTransactionData);
    });

    onBeforeUnmount(() => {
      // Cleanup event listener
      window.removeEventListener("transaction storage", fetchTransactionData);
    });

    return {
      steps,
      markStepCompleted,
      isOpenReturn,
      toggleOpenReturn,
      activeModal,
      openModal,
      closeModal,
      transaction,
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
};
</script>
