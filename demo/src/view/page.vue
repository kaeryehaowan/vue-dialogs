<template>
  <div class="page">
    <h2 class="h2">dialog router，类vue-router的方式管理dialog，类component的方式使用dialog。</h2>
    <p class="p">
      1: 全局注册，统一管理。
      <br />2: 可懒加载。
      <br />3: 支持props，callback。
      <br />4: 可通过 uid（dialog唯一返回值），获取到dialogComponent的组件实例。
      <br />5: 可通过 uid 关闭指定的 dialog。
      <br />6: 可通过 v-dialog 指令打开 dialog。
    </p>
    <div class="pane">
      <h3 class="h3">methods</h3>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="方法" width="100"></el-table-column>
        <el-table-column prop="des" label="说明"></el-table-column>
        <el-table-column prop="props" label="参数"></el-table-column>
      </el-table>
    </div>
    <div class="pane">
      <h3 class="h3">使用</h3>
      <div class="code">
        <codemirror ref="codeUse" v-model="codeUse" :options="useOptions" />
      </div>
    </div>
    <div class="pane">
      <h3 class="h3">基本用法</h3>
      <p class="p">传入 props，通过on注册callback</p>
      <el-button @click="dialog1">打开 dialog</el-button>
      <div class="code">
        <codemirror ref="baseCode" v-model="baseCode" :options="cmOptions" />
      </div>
    </div>
    <div class="pane">
      <h3 class="h3">uid用法</h3>
      <p
        class="p"
      >通过 this.$dialogRouter.push() 返回 uid，在当前 dialog 处理激活时，可通过 uid 获取 dialogComponent的组件实例，也可调用 this.$dialogRouter.close(uid) 来关闭当前dialog。</p>
      <el-button @click="dialog2">打开 dialog</el-button>
      <div class="code">
        <codemirror ref="codeUid" v-model="codeUid" :options="cmOptions" />
      </div>
    </div>
    <div class="pane">
      <h3 class="h3">v-dialog用法</h3>
      <p class="p">可通过在元素上设置v-dialog指令，打开dialog</p>
      <el-button v-dialog:click="{name: 'dia3'}">打开 dialog</el-button>
      <div class="code">
        <codemirror ref="codeVDialog" v-model="codeVDialog" :options="cmOptions" />
      </div>
    </div>
  </div>
</template>
<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
export default {
  name: "page",
  components: { codemirror },
  computed: {
    codemirrorCodeUse(){
      return this.$refs.codeUse.codemirror
    },
    codemirrorBaseCode(){
      return this.$refs.baseCode.codemirror
    },
    codemirrorCodeUid(){
      return this.$refs.codeUid.codemirror
    },
    codemirrorCodeVDialog(){
      return this.$refs.codeVDialog.codemirror
    },
  },
  data() {
    return {
      tableData: [
        {
          name: "push",
          des:
            "类似 vue-router 的 push，用来打开一个 dialog 组件。this.$dialogRouter.push({name,props,on},callBack)",
          props:
            "name[type=String]为dialogRouter里注册时的name值，props[type=Object]为需要传入到dialog的属性，on[type=Object]为注册的event；callBack为打开 dialog 之后的回调，它有两个参数，一个为 dialogComponent实例，一个为 uid",
        },
        {
          name: "close",
          des: "可通过 uid 来关闭 dialog。this.$dialogRouter.close(uid)",
          props: "uid 为 push 时返回的唯一值",
        },
        {
          name: "closeAll",
          des: "关闭全部 dialog",
          props: "无",
        },
        {
          name: "getDialog",
          des:
            "用来获取 dialog 实例，这是一个同步方法，因为视图渲染 或 懒加载的原因，可能会无法获取到实例，需要自行把握调用时机，建议在 push callBack 里获取实例",
          props: "uid 为 push 时返回的唯一值",
        },
      ],
      baseCode: `<template>
      <el-button @click="dialog1">打开 dialog</el-button>
</template>
\<script>
export default {
  methods: {
    dialog1(){
      this.$dialogRouter.push({
        name: 'dia1',
        props: {
          name: 'kael',
          age: 24,
          sex: '男',
          list: [1,2,3]
        }
      })
    },
    on: {
      callback: data => {
        console.log(data)
      }
    }
  }
}
<\/script>`,
      codeVDialog: `<template>
      <el-button v-dialog:click="{name: 'dia3'}">打开 dialog</el-button>
</template>`,
      codeUid: `<template>
      <el-button @click="dialog2">打开 dialog</el-button>
</template>
\<script>
export default {
  methods: {
    dialog2() {
      this.uid = this.$dialogRouter.push(
        {
          name: "dia2",
        },
        (instance, uid) => {
          // 在回调里操作实例
          console.log(instance);
          console.log(uid);
          setTimeout(() => {
            instance.name = "外部修改";
          }, 2000);
        }
      );
      // 调用 this.$dialogRouter.close(uid) 关闭 dialog
      setTimeout(()=>{
        this.$dialogRouter.close(this.uid)
      }, 4000)
    },
  }
}
<\/script>`,
      codeUse: `// main.js
import Vue from "vue";
import App from "./App.vue";
import dialogRouter from "./dialogRouter";

new Vue({
  router,
  dialogRouter,
  render: (h) => h(App),
}).$mount("#app");


// dialogRouter.js
import Vue from "vue";
import DialogRouter from "vue-dialogs-router";
import dialog1 from "@/dialog/dialog-1.vue";
Vue.use(DialogRouter);

const dialogRouter = new DialogRouter({
  dia1: dialog1,
  dia2: () => import(/* webpackChunkName: "dialog" */ "@/dialog/dialog-2.vue"),
  dia3: () => import(/* webpackChunkName: "dialog" */ "@/dialog/dialog-3.vue"),
});

export default dialogRouter;

// page.vue
this.$dialogRouter.push({name: 'dia1'})
      `,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/x-vue",
        theme: "base16-light",
        readOnly: "nocursor",
        lineNumbers: true,
        line: true,
      },
      useOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-light",
        readOnly: "nocursor",
        lineNumbers: true,
        line: true,
      },
    };
  },

  methods: {
    dialog1() {
      this.$dialogRouter.push({
        name: "dia1",
        props: {
          name: "kael",
          age: 24,
          sex: "男",
          list: [1, 2, 3],
        },
        on: {
          callback: (data) => {
            console.log(data);
          },
        },
      });
    },
    dialog2() {
      this.uid = this.$dialogRouter.push(
        {
          name: "dia2",
        },
        (instance, uid) => {
          // 在回调里操作实例
          console.log(instance);
          console.log(uid);
          setTimeout(() => {
            instance.name = "外部修改";
          }, 2000);
        }
      );
      // 调用 this.$dialogRouter.close(uid) 关闭 dialog
      setTimeout(() => {
        this.$dialogRouter.close(this.uid);
      }, 4000);
    },
  },
  mounted() {
    this.codemirrorCodeUse.setSize('auto','460px')
    this.codemirrorBaseCode.setSize('auto','400px')
    this.codemirrorCodeUid.setSize('auto','460px')
    this.codemirrorCodeVDialog.setSize('auto','70px')
    window.kael = this;
  },
};
</script>
<style scoped>
.page {
  padding: 10px 20px;
}
.h2 {
  font-weight: 400;
  color: #1f2f3d;
  font-size: 28px;
  margin: 0;
  padding: 0;
}
.h3 {
  font-weight: 400;
  color: #1f2f3d;
  font-size: 22px;
  margin: 0;
  padding: 0;
}
.p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}
.code {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 12px;
  padding: 8px;
}
.pane {
  margin: 20px;
}
</style>