<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50 w-screen"
  >
    <div class="rounded-xl shadow-lg w-[800px] bg-white fixed top-60">
      <div class="text-text1 text-[13px] rounded-xl">
        <!-- Header -->
        <div
          class="w-full p-4 py-3 text-green-700 rounded-t-xl flex justify-between items-center"
        >
          <div class="flex items-center gap-1">
            <icon name="time" />
            <h1 class="font-bold tracking-wide text-[14px]">Log History</h1>
          </div>
          <icon
            name="circle-close3"
            @click="closeModal"
            class="cursor-pointer"
          />
        </div>
        <div>
          <table-log-history :student="student" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableLogHistory from "../tables/table-log-history.vue";
import icon from "@/assets/icon.vue";

export default {
  name: "HistoryStudent",
  components: {
    tableLogHistory,
    icon,
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close"); // Emits event to close modal
    },
  },
};
</script>

<style scoped></style>
