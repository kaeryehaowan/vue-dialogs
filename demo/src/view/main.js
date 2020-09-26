import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Dialogs from '@xsyx/vue-dialogs'
import dialog1 from "@/dialog/dialog-1.vue";
import dialog2 from "@/dialog/dialog-2.vue";

Vue.use(Dialogs);

const dialogs = new Dialogs({
  dia1: dialog1,
  dia2: dialog2
});

new Vue({
  router,
  dialogs,
  render: (h) => h(App),
}).$mount("#app");
