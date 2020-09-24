import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import dialogRouter from "./dialogRouter";

new Vue({
  router,
  dialogRouter,
  render: (h) => h(App),
}).$mount("#app");
