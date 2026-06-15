import { createRouter, createWebHistory } from "vue-router";

// ADMIN IMPORTS
// !GLOBAL PAGES
import adminDashboard from "@/components/admin-page/dashboard/admin-dashboard.vue";
import login from "@/components/admin-page/landing-page/login.vue";
import register from "@/components/admin-page/landing-page/register.vue";
import unauthorizePage from "@/components/admin-page/landing-page/unauthorize-page.vue";
// !SIDEBAR PAGES
import adminSidebar from "@/components/admin-page/global/sidebar/admin-sidebar.vue";
// !TOP BAR PAGES
import profileContent from "@/components/admin-page/global/profile/profile-content.vue";
// !STUDENT RECORDS PAGES
import adminStudentRecords from "@/components/admin-page/students-records/admin-student-records.vue";
import studentsRecordsView from "@/components/admin-page/students-records/actions/view-student.vue";
// !TRANSACTION PAGES
import adminTransactionLogs from "@/components/admin-page/transaction-logs/admin-transaction-logs.vue";
import transactionView from "@/components/admin-page/transaction-logs/actions/view-transaction.vue";

// STUDENT IMPORTS
// !GLOBAL PAGES
import studentDashboard from "@/components/student-page/dashboard/student-dashboard/student-dashboard.vue";
import studentSidebar from "@/components/student-page/global/sidebar/student-sidebar.vue";
// !REQUEST OF DOCUMENTS
import studentRequestDocs from "@/components/student-page/request-documents/student-request-docs.vue";
const routes = [
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },

  // FOR ADMIN
  {
    path: "/",
    name: "adminSidebar",
    component: adminSidebar,
    children: [
      {
        path: "admin-dashboard",
        name: "adminDashboard",
        component: adminDashboard,
        meta: { requiresAuth: true, role: "Admin" },
      },
      {
        path: "student-records",
        name: "adminStudentRecords",
        component: adminStudentRecords,
        meta: { requiresAuth: true, role: "Admin" },
      },
      {
        path: "students-views",
        name: "studentsRecordsView",
        component: studentsRecordsView,
        props: true,
        meta: { requiresAuth: true, role: "Admin" },
      },
      {
        path: "transaction-logs",
        name: "adminTransactionLogs",
        component: adminTransactionLogs,
        meta: { requiresAuth: true, role: "Admin" },
      },
      {
        path: "transaction-view",
        name: "transactionView",
        component: transactionView,
        meta: { requiresAuth: true, role: "Admin" },
      },
      {
        path: "profile-view",
        name: "profileContent",
        component: profileContent,
        meta: { requiresAuth: true, role: "Admin" },
      },
    ],
  },

  // FOR STUDENT
  {
    path: "/",
    name: "studentSidebar",
    component: studentSidebar,
    children: [
      {
        path: "/student-dashboard",
        name: "studentDashboard",
        component: studentDashboard,
        meta: { requiresAuth: true, role: "Student" },
      },

      {
        path: "/request-document",
        name: "studentRequestDocs",
        component: studentRequestDocs,
        meta: { requiresAuth: true, role: "Student" },
      },
    ],
  },
  {
    path: "/unauthorized",
    component: unauthorizePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 🔒 Add this here
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role");

  if (to.meta.requiresAuth) {
    if (!role) {
      return next("/login"); // Not logged in
    }

    if (to.meta.role && to.meta.role !== role) {
      return next("/unauthorized"); // Unauthorized access
    }
  }

  next(); // Continue as normal
});

export default router;
