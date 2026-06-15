<template>
  <div class="grid grid-cols-6 gap-3 w-full z-0">
    <div
      v-for="(desc, i) in descriptions"
      :key="i"
      class="bg-white shadow-sm rounded-2xl p-2 h-[140px] flex flex-col justify-center relative"
    >
      <!-- Colored Line Inside Card
      <div
        :class="lineColors[i]"
        class="h-full w-2 absolute top-0 left-0"
      ></div> -->
      <div class="p-2">
        <!-- Title and Icon Wrapper -->
        <div class="flex items-center">
          <div class="flex items-center justify-between w-full h-7 gap-20">
            <!-- Title with background color -->
            <h2
              :class="[
                'text-[12px]',
                'font-semibold',
                'rounded-xl',
                'p-2',
                'h-6',
                'flex',
                'items-center',
                textColors[i],
                titleBgColors[i],
              ]"
            >
              {{ titles[i] }}
            </h2>
          </div>
          <!-- Separate Icon -->
          <icon :name="icons[i]" class="w-10 text-gray-700" />
        </div>
        <!-- Content inside the card -->
        <div class="mt-7 font-semibold text-2xl">
          <p v-if="i === 0"><pending /></p>
          <p v-if="i === 1"><pending /></p>
          <p v-if="i === 2"><pending /></p>
          <p v-if="i === 3"><pending /></p>
          <p v-if="i === 4"><pending /></p>
          <p v-if="i === 5"><pending /></p>
        </div>
        <div class="font-semibold text-[10px] text-blue-400">
          <p v-if="i === 0">+ 8% from yesterday</p>
          <p v-if="i === 1">+ 8% from yesterday</p>
          <p v-if="i === 2">+ 8% from yesterday</p>
          <p v-if="i === 3">+ 8% from yesterday</p>
          <p v-if="i === 4">+ 8% from yesterday</p>
          <p v-if="i === 5">+ 8% from yesterday</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pending from "../status-cards/pending.vue";
import icon from "@/assets/icon.vue";

export default {
  name: "DashboardPage",
  components: {
    pending,
    icon,
  },
  data() {
    return {
      titles: [
        "PENDING",
        "PROCESSING",
        "PROCESSED",
        "ON-PROCESS",
        "READY FOR CLAIM",
        "COMPLETED",
      ],
      descriptions: [
        "First card description.",
        "Second card is different.",
        "This is the third card.",
        "Fourth card has unique text.",
        "Fifth card stands out.",
        "Finally, the sixth card.",
      ],
      lineColors: [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
      ],
      titleBgColors: [
        "bg-red-200",
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-purple-200",
        "bg-pink-200",
      ],

      textColors: [
        "text-red-500",
        "text-blue-500",
        "text-green-500",
        "text-yellow-500",
        "text-purple-500",
        "text-pink-500",
      ],

      icons: ["printers", "chart-bar", "document", "userss", "cog", "bells"],
    };
  },
};
</script>
<style lang=""></style>
