<template>
  <div class="page">
    <h2 class="h2">dialog router，类vue-router的方式管理dialog，类component的方式使用dialog。</h2>
    <p class="p" style="padding-left: 20px">
      1: 全局注册，统一管理。
      <br />2: 可懒加载。
      <br />3: 支持props，callback。
      <br />4: 可通过 uid（dialog唯一返回值），获取到dialogComponent的组件实例。
      <br />5: 可通过 uid 关闭指定的 dialog。
      <br />6: 可通过 v-dialog 指令打开 dialog。
    </p>
    <div class="pane">
      <h3 class="h3">Installation</h3>
      <pre v-highlightjs="installCode" class="code-container">
        <code class="js code-value"></code>
        <i class="el-icon-document-copy copy-button" @click="copy('install')"></i>
      </pre>
    </div>
    <div class="pane">
      <h3 class="h3">Usage</h3>
      <pre v-highlightjs="useCode" class="code-container">
        <code class="js code-value"></code>
        <i class="el-icon-document-copy copy-button" @click="copy('use')"></i>
      </pre>
    </div>
    <div class="pane">
      <h3 class="h3">Notes</h3>
      <p
        class="p"
      >Vue.use(DialogRouter, {key: 'show'})，这里的 key 即为控制 dialog 是否显示的变量。默认为 show。dialog 组件里必须要有这个 key</p>
    </div>
    <div class="pane">
      <h3 class="h3">基础使用</h3>
      <p class="p">传入 props，通过on注册callback</p>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <page1 />
          </template>
          <pre v-highlightjs="page1Code" class="code-container">
            <code class="html code-value"></code>
            <i class="el-icon-document-copy copy-button" @click="copy('page1')"></i>
          </pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="pane">
      <h3 class="h3">uid用法</h3>
      <p class="p">通过 this.$dialogRouter.push() 返回 uid，在当前 dialog 处理激活时，可通过 uid 获取 dialogComponent的组件实例，也可调用 this.$dialogRouter.close(uid) 来关闭当前dialog。</p>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <page2 />
          </template>
          <pre v-highlightjs="page2Code" class="code-container">
            <code class="html code-value"></code>
            <i class="el-icon-document-copy copy-button" @click="copy('page2')"></i>
          </pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="pane">
      <h3 class="h3">指令方式</h3>
      <p class="p">可通过在元素上设置v-dialog指令，打开dialog</p>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <page3 />
          </template>
          <pre v-highlightjs="page3Code" class="code-container">
            <code class="html code-value"></code>
            <i class="el-icon-document-copy copy-button" @click="copy('page3')"></i>
          </pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="pane">
      <h3 class="h3">Methods</h3>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="方法" width="100"></el-table-column>
        <el-table-column prop="des" label="说明"></el-table-column>
        <el-table-column prop="props" label="参数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import useCode from "!!raw-loader!@/view/main.js";
import page1 from "@/components/page1";
import page1Code from "!!raw-loader!@/components/page1.vue";
import page2 from "@/components/page2";
import page2Code from "!!raw-loader!@/components/page2.vue";
import page3 from "@/components/page3";
import page3Code from "!!raw-loader!@/components/page3.vue";
export default {
  name: "page",
  components: { page1, page2, page3 },
  data() {
    return {
      installCode: "npm i @xsyx/vue-dialogs -S",
      useCode,
      page1Code,
      page2Code,
      page3Code,
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
    };
  },

  methods: {
    copy(type) {
      this.$copyText(this[`${type}Code`]).then(() => {
        this.$message({
          type: "success",
          message: "复制成功",
        });
      });
    },
  },
  mounted() {
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
  margin: 0;
}
.code {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 12px;
  padding: 8px;
}
.pane {
  margin: 20px;
}
.code-container {
  position: relative;
  border: 1px solid #d7dae2;
  border-radius: 2px;
  padding: 8px;
  font-size: 0;
}
.code-value {
  font-size: 12px;
}
.copy-button {
  position: absolute;
  font-size: 16px;
  cursor: pointer;
  color: #d7dae2;
  border-radius: 2px;
  right: 8px;
  top: 8px;
}
.copy-button:hover {
  color: #999;
}
</style>