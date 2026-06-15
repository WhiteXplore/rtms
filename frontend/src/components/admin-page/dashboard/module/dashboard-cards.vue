<template>
  <div>
    <h1 class="font-regular text-sm text-gray-600 tracking-wide">
      My Task Status
    </h1>

    <div class="grid grid-cols-3 gap-3 mt-4">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          card.bg,
          'relative rounded-xl p-4 h-[140px]  overflow-hidden flex flex-col justify-between shadow-sm border',
        ]"
      >
        <!-- Top Label -->
        <div class="text-gray-600 text-sm tracking-wide">
          {{ card.label }}
        </div>

        <!-- Big Number -->
        <div class="text-4xl font-bold text-gray-800">
          {{ card.count }}
        </div>

        <!-- Icon & Diagonal White Shape -->
        <div
          :class="[
            card.iconBg,
            'absolute bottom-10 right-12 w-14 h-14 rounded-lg flex items-center justify-center',
          ]"
        >
          <icon :name="card.icon" :class="[card.iconColor, 'text-center']" />
        </div>

        <!-- Bottom Info -->
        <div
          class="text-[10px] tracking-wider font-medium"
          :class="card.textColor"
        >
          {{ card.footer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "../../../../assets/icon.vue";
import axios from "axios";
export default {
  components: {
    icon,
  },
  data() {
    return {
      processed: 0,
      onProcess: 0,
      completed: 0,
      user: {},
    };
  },

  computed: {
    cards() {
      return [
        {
          label: "Total Processed",
          count: this.processed,
          footer: "+ 2% from yesterday",
          icon: "arrow-path",
          bg: "bg-gray-50",
          iconColor: "text-green-600",
          iconBg: "bg-green-200",
          textColor: "text-green-600",
        },
        {
          label: "Total On-Process",
          count: this.onProcess,
          footer: "+ 2% from yesterday",
          icon: "computer",
          bg: "bg-gray-50",
          iconColor: "text-yellow-500",
          iconBg: "bg-yellow-200",
          textColor: "text-yellow-500",
        },
        {
          label: "Total Completed",
          count: this.completed,
          footer: "+ 2% from yesterday",
          icon: "check3",
          bg: "bg-gray-50",
          iconColor: "text-pink-500",
          iconBg: "bg-pink-200",
          textColor: "text-pink-500",
        },
      ];
    },
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });

        if (response.data) {
          this.user = response.data;
          console.log("Dashboard User:", this.user);
        } else {
          // If no user data is returned, redirect to home
          this.$router.push("/");
          location.reload();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        this.$router.push("/"); // Redirect on error
      }
    },

    async fetchStatus() {
      try {
        const response = await axios.get(
          "http://localhost:8000/transaction-logs-data/get-transaction-logs"
        );

        // Debug logs
        console.log("Fetched transaction logs:", response.data);
        console.log("Current user email:", this.user.email);

        // Initialize counters
        this.processed = 0;
        this.completed = 0;
        this.onProcess = 0;

        // Make sure the user is fetched before filtering
        if (!this.user.email) return;

        // Filter and count based on matching user email
        response.data.forEach((item) => {
          if (item.staff_email === this.user.email) {
            console.log("Matching item:", item);
            switch (item.status) {
              case "PROCESSED":
                this.processed++;
                break;
              case "ON PROCESS":
                this.onProcess++;
                break;
              case "COMPLETED":
                this.completed++;
                break;
            }
          }
        });

        // Debug counts
        console.log("Processed:", this.processed);
        console.log("On Process:", this.onProcess);
        console.log("Completed:", this.completed);
      } catch (error) {
        console.error("Error fetching processing transactions:", error);
      }
    },
  },
  mounted() {
    this.fetchUser().then(() => {
      this.fetchStatus();
    });
  },
};
</script>
