<template>
  <div
    class="w-screen h-screen bg-Green flex items-center justify-center font-poppins text-gray-700"
  >
    <!-- Container - Main Content -->
    <div
      class="bg-[#F8F8FB] w-[98vw] max-w-full h-[98vh] max-h-full mt-4 rounded-t-xl shadow-lg shrink-0"
    >
      <adminTopbar />

      <!-- Navigation + Subitems -->
      <div class="relative" @mouseleave="handleNavLeave">
        <!-- bg-Green/10 backdrop-blur-xl -->
        <ul
          class="flex gap-1 text-[12px] font-regular cursor-pointer p-2 bg-gray-200"
        >
          <li
            v-for="(item, index) in navItems"
            :key="index"
            class="p-1 px-2 py-2 rounded-md ml-3 flex items-center gap-1 relative"
            :class="{
              'bg-Green text-white':
                isActive(item.route) ||
                (item.name === 'Reports' && isReportsActive),
              'hover:bg-Green hover:text-white':
                !isActive(item.route) &&
                !(item.name === 'Reports' && isReportsActive),
            }"
            @mouseenter="handleNavHover(item)"
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

            <!-- For 'Reports' item with subitems -->
            <div v-else-if="item.icons" class="flex items-center gap-1 w-full">
              <icon :name="item.icons[0]" />
              <span>{{ item.name }}</span>
              <icon :name="item.icons[1]" />
            </div>
          </li>
        </ul>

        <!-- Subitems dropdown -->
        <div
          v-if="isShowSubItems"
          class="absolute top-full left-[450px] z-50 bg-white rounded-xl p-2 w-[200px] mt-2 shadow-lg gap-2 flex flex-col text-[12px]"
          @mouseenter="cancelHideSubItems"
          @mouseleave="handleSubItemsLeave"
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
            <router-link
              :to="item.route"
              class="flex items-center gap-1 p-2 w-full"
              @click="handleSubItemClick"
            >
              <icon :name="item.icon" />
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Main Content View -->
      <div class="px-5">
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
import adminTopbar from "../topbar/admin-topbar.vue";
import icon from "@/assets/icon.vue";

export default {
  components: {
    adminTopbar,
    icon,
  },
  data() {
    return {
      isShowSubItems: false,
      navItems: [
        { name: "Dashboard", route: "/admin-dashboard", icon: "dashboard" },
        { name: "Student Records", route: "/student-records", icon: "users" },
        {
          name: "Transaction Records",
          route: "/transaction-logs",
          icon: "transaction-logs",
        },
        { name: "Reports", icons: ["utilities", "arrow-down1"] },

        { name: "Admin Tools", route: "/admin-tools", icon: "setting" },
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
      leaveTimeout: null, // Stores the timeout ID for clearing the delay
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
    handleNavHover(item) {
      if (item.name === "Reports") {
        clearTimeout(this.leaveTimeout);
        this.isShowSubItems = true;
      }
    },
    handleNavLeave() {
      this.leaveTimeout = setTimeout(() => {
        this.isShowSubItems = false;
      }, 300); // 300ms only
    },
    handleSubItemsLeave() {
      this.leaveTimeout = setTimeout(() => {
        this.isShowSubItems = false;
      }, 300);
    },
    cancelHideSubItems() {
      clearTimeout(this.leaveTimeout);
    },
    handleNavClick(item) {
      if (item.name === "Reports") {
        this.isShowSubItems = !this.isShowSubItems;
      } else {
        this.isShowSubItems = false;
      }
    },
    handleSubItemClick() {
      this.isShowSubItems = false;
    },
  },
};
</script>
