import Vue from "vue";
import Dialogs from "../../../dist/bundle";
import dialog1 from "@/dialog/dialog-1.vue";
import dialog2 from "@/dialog/dialog-2.vue";
Vue.use(Dialogs);

const dialogs = new Dialogs({
  dia1: dialog1,
  dia2: dialog2
});

export default dialogs;
