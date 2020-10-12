import Vue from "vue";
import Dialogs from "../../../dist/bundle";
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

const dialog = new Dialogs({ dialogs });

export default dialog;
