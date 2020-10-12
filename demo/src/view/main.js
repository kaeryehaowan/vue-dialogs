import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Dialogs from "@xsyx/vue-dialogs";
import dialog1 from "@/dialog/dialog-1.vue";
import dialog2 from "@/dialog/dialog-2.vue";

Vue.use(Dialogs);

let dialogs = [
  {
    name: "dia1",
    component: dialog1,
  },
  {
    name: "dia2",
    component: dialog2,
  },
];

const dialog = new Dialogs({ dialogs});

new Vue({
  router,
  dialog,
  render: (h) => h(App),
}).$mount("#app");
