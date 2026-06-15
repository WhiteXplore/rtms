<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-bold">Confirm Completion</h2>
      <p>Are you sure you want to mark "{{ step.name }}" as completed?</p>
      <div class="flex justify-end space-x-2 mt-4">
        <button
          class="px-4 py-2 bg-gray-400 text-white rounded-md"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-green-600 text-white rounded-md"
          @click="$emit('confirm')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepCompletionModal",
  props: {
    step: Object,
    isOpen: Boolean,
  },
};
</script>
