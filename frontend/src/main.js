import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import "@fontsource/poppins/400.css";

import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia) // ✅ Use pinia instead of undefined `store`
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: "top-right",
    theme: "light",
  })

  .mount("#app");
