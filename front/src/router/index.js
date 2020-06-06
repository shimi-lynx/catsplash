import Vue from "vue";
import VueRouter from "vue-router";
import PhotoList from "../views/PhotoList.vue";
import Auth from "../views/Auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PhotoList",
    component: PhotoList
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
