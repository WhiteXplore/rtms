<template>
  <div
    class="relative w-full min-h-screen font-poppins flex items-center justify-center"
  >
    <!-- Background Image -->
    <img
      src="../../../assets/img/landing-bg.png"
      alt="Background"
      class="absolute inset-0 object-cover w-full h-full z-0 opacity-95"
    />
    <div class="bg-Green opacity-30 absolute inset-0"></div>

    <!-- Login Form Container -->
    <div class="relative z-10 bg-white shadow-xl rounded-xl w-[500px]">
      <!-- Header -->
      <h2
        class="textlg tracking-wide font-semibold text-white p-3 px-4 bg-green-600 rounded-t-xl"
      >
        Register Your Account
      </h2>
      <div class="p-6">
        <!-- Form -->
        <form @submit.prevent="submitForm" class="space-y-4 text-[14px]">
          <div>
            <h1 class="font-semibold">Personal Details</h1>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Middle Name</label
            >
            <input
              type="text"
              v-model="middle_name"
              class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your middle name"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              type="text"
              v-model="last_name"
              class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              type="text"
              v-model="first_name"
              class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <h1 class="font-semibold">Account Details</h1>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
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
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {{ showPassword ? "👁️" : "🔒" }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                class="mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Confirm your password"
                required
                @input="validatePasswordMatch"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {{ showPassword ? "👁️" : "🔒" }}
              </button>
            </div>
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">
              {{ passwordError }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            :disabled="passwordError"
          >
            Submit
          </button>

          <div
            class="flex flex-col items-center gap-4 justify-center text-[12px] text-gray-600"
          >
            <router-link to="/">
              <p>
                Already have an account?
                <span class="text-green-900 font-semibold underline"
                  >Sign in here!</span
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
export default {
  name: "RegisterPage",
  data() {
    return {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      passwordError: "",
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validatePasswordMatch() {
      this.passwordError =
        this.password !== this.confirmPassword ? "Passwords do not match!" : "";
    },
    submitForm() {
      if (!this.passwordError) {
        alert("Registration successful!");
        // You can submit your form data here
      }
    },
  },
};
</script>
