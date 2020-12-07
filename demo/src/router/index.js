import Vue from "vue";
import VueRouter from "vue-router";
import page from "@/view/page";
import about from "@/view/about";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "page",
    component: page,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
