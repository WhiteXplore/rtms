<template>
  <div
    class="w-screen h-screen bg-Green flex items-center justify-center font-poppins text-gray-700"
  >
    <!-- Container - Main Content -->
    <div
      class="bg-[#F8F8FB] w-[98vw] max-w-full h-[98vh] max-h-full mt-4 rounded-t-xl shadow-lg shrink-0"
    >
      <studentTopbar />

      <!-- Navigation Bar -->
      <div>
        <ul
          class="flex gap-3 text-[12px] font-regular cursor-pointer rounded-md p-2"
        >
          <li
            v-for="(item, index) in navItems"
            :key="index"
            class="p-1 px-2 rounded-md ml-2 flex items-center gap-1"
            :class="{
              'bg-Green text-white':
                isActive(item.route) ||
                (item.name === 'Reports' && isReportsActive),
              'hover:bg-Green hover:text-white': !(
                isActive(item.route) ||
                (item.name === 'Reports' && isReportsActive)
              ),
            }"
            @click="handleNavClick(item)"
          >
            <router-link
              v-if="item.route"
              :to="item.route"
              class="flex items-center gap-1 w-full"
            >
              <icon :name="item.icon" />
              {{ item.name }}
            </router-link>
            <div v-else class="flex items-center gap-1 w-full">
              <icon :name="item.icon" />
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>

      <!-- Sub Items Overlay -->
      <div
        v-if="isShowSubItems"
        class="absolute top-22 right-0 left-[480px] z-50 bg-white rounded-xl p-2 w-full max-w-[200px] mt-1 shadow-lg gap-2 flex flex-col text-[12px]"
      >
        <div
          v-for="(item, index) in subItems"
          :key="index"
          :class="{
            'bg-Green text-white rounded-lg': isActive(item.route),
            'hover:bg-Green hover:text-white hover:rounded-lg': !isActive(
              item.route
            ),
          }"
        >
          <div class="flex justify-start items-center relative">
            <router-link
              v-if="item.route"
              :to="item.route"
              class="flex items-center gap-1 p-2 w-full"
              @click="handleNavClick(item)"
            >
              <icon :name="item.icon" />
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Main Content View -->
      <div class="px-1">
        <div
          class="max-w-full max-h-full h-[86vh] overflow-auto scrollbar-none"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentTopbar from "../topbar/student-topbar.vue";
import icon from "@/assets/icon.vue";

export default {
  name: "studentSidebar",
  components: {
    studentTopbar,
    icon,
  },
  data() {
    return {
      isShowSubItems: false,
      navItems: [
        { name: "Dashboard", route: "/student-dashboard", icon: "dashboard" },
        {
          name: "Request Documents",
          route: "/request-document",
          icon: "transaction-logs",
        },

        { name: "Reports", icon: "utilities" },
      ],
      subItems: [
        {
          name: "Enrollment Report",
          route: "/transaction-logs",
          icon: "dashboard",
        },
        {
          name: "Transaction Report",
          route: "/#",
          icon: "users",
        },
      ],
    };
  },
  computed: {
    isReportsActive() {
      return this.subItems.some((item) => this.$route.path === item.route);
    },
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    handleNavClick(item) {
      if (item.name === "Reports") {
        this.isShowSubItems = !this.isShowSubItems;
      } else {
        this.isShowSubItems = false;
      }
    },
  },
};
</script>
