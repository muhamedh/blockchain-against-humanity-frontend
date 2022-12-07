import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/:contractAddress/manage",
    name: "manage",

    component: () =>
    import(/* webpackChunkName: "profile" */ "../views/ContractManageView.vue"),
  },
  {
    path: "/settings",
    name: "settings",

    component: () =>
    import("../views/SettingsView.vue"),
  },
  {
    path: "/:contractAddress/play",
    name: "play",

    component: () =>
    import("../views/PlayView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
