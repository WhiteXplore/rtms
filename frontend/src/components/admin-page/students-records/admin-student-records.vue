<template>
  <div class="px-4 mt-3">
    <!-- Headers -->
    <div class="flex justify-between items-center">
      <h1 class="font-semibold tracking-wide text-lg">Student Records</h1>
    </div>

    <!-- Main Content  -->
    <div class="mt-3">
      <!-- Table -->
      <tableStudentRecords />
    </div>
  </div>
</template>

<script>
import tableStudentRecords from "./tables/table-student-records.vue";
export default {
  name: "StudentRecordsPage",
  components: {
    tableStudentRecords,
  },
};
</script>

<style scoped>
/* Add any required styles here */
</style>
