import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import signupView from "../views/signupView.vue";
import { isAuthenticated } from "../utility";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false,layout:'authLayout' },
    },
    {
      path: "/signup",
      name: "Signup",
      component: signupView,
      meta: { requiresAuth: false,layout:'authLayout' },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true,layout:'dashLayout' },
    },
    {
      path: "/sensors",
      name: "Sensors",
      component: () => import("../views/SensorView.vue"),
      meta: { requiresAuth: true ,layout:'authLayout'},
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/");
    }
  } else if (to.matched.some((record) => !record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
