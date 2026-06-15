<template>
  <div class="text-center mt-20">
    <h1 class="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
    <p class="text-gray-700 mt-4">
      You do not have permission to access this page.
    </p>
    <router-link to="/" class="text-green-600 underline mt-2 block"
      >Return Home</router-link
    >
  </div>
</template>

<script>
export default {
  name: "UnauthorizedPage",
};
</script>
<style lang=""></style>
