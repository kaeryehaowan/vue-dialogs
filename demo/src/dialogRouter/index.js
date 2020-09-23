import Vue from "vue";
import DialogRouter from "../../../dist/bundle";
import dialog1 from "@/dialog/dialog-1.vue";
Vue.use(DialogRouter);

const dialogRouter = new DialogRouter({
  dia1: dialog1,
  dia2: () => import(/* webpackChunkName: "dialog" */ "@/dialog/dialog-2.vue"),
  dia3: () => import(/* webpackChunkName: "dialog" */ "@/dialog/dialog-3.vue"),
});

export default dialogRouter;
