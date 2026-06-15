<template>
  <div class="relative w-full min-h-screen font-poppins flex flex-col">
    <!-- Background Image -->
    <img
      src="../../../assets/img/landing-bg.png"
      alt="Background"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-95"
    />

    <div
      class="bg-Green opacity-30 min-w-screen min-h-screen absolute inset-0"
    ></div>
    <!-- Login Form Container -->
    <div
      class="min-w-screen min-h-screen flex items-center justify-center relative"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div class="flex flex-col mb-5">
          <h2 class="text-xl font-semibold text-gray-800">
            Sign in to Your Account
          </h2>
          <p class="text-sm text-gray-600">Welcome back!</p>
        </div>

        <form @submit.prevent="login" class="space-y-4 text-sm">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                <!-- <span>{{ showPassword ? "🙈" : "👁️" }}</span> -->
                <icon :name="showPassword ? 'eye-close' : 'eye-open'" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign in
          </button>

          <div
            class="flex flex-col items-center gap-2 text-xs text-gray-600 pt-2"
          >
            <router-link to="/register">
              <p>
                Don't have an account yet?
                <span class="text-green-900 font-semibold underline"
                  >Register here!</span
                >
              </p>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import icon from "@/assets/icon.vue";
export default {
  name: "SignupPage",
  components: {
    icon,
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      role: "", // Added role to store the user's role
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        );

        this.role = response.data.role;
        localStorage.setItem("role", this.role); // Add this

        // Redirect based on user role
        if (this.role === "Admin") {
          this.$router.push("/admin-dashboard");
        } else if (this.role === "Student") {
          this.$router.push("/student-dashboard");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped></style>
