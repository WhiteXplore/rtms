<template>
  <div class="relative group inline-block">
    <slot></slot>
    <span
      class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex bg-gray-700 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap"
    >
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: "TooltipPage",
  props: {
    text: String, // Tooltip text
  },
};
</script>

<style scoped>
/* Optional: Add smooth fade-in effect */
.group-hover span {
  transition: opacity 0.2s ease-in-out;
}
</style>
