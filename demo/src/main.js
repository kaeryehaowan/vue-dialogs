import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/github.css";
import dialog from "./dialogRouter";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

Vue.use(VueHighlightJS);

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  name: 'root',
  router,
  dialog,
  render: (h) => h(App),
}).$mount("#app");
