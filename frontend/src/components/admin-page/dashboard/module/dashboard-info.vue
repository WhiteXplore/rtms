<template>
  <div>
    <div class="flex flex-col gap-4 w-[23vw] h-full">
      <div class="relative">
        <!-- Image -->
        <img
          src="../../../../assets/img/cover1.jpg"
          alt=""
          class="h-[120px] w-full object-cover rounded-t-lg"
        />

        <!-- White circle -->
        <div
          class="w-24 h-24 bg-green-900 rounded-full absolute left-14 top-14"
        >
          <img
            src="../../../../assets/img/remar.png"
            alt=""
            class="w-24 h-24 rounded-full object-cover border-4 border-white"
          />
        </div>
      </div>
    </div>

    <!-- Personal Information  -->
    <div class="p-8 mt-2">
      <h1 class="text-[14px]">Remar John F. Sibug</h1>
      <p class="text-[12px] ml-2">Administrative Aide</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardInfo",
};
</script>
