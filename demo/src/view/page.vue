<template>
  <div class="page">
    <h2 class="h2">XSFE Dialogs「集中式」解决方案</h2>
    <p class="p" style="padding-left: 20px">
      统一注册，可在页面任何地方通过注册时的 key ，获取到 dialog 组件实例。继而就可以对 dialog 进行任何操作。
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
      <h3 class="h3">基础使用</h3>
      <p class="p">比如，在 dialog 组件里，设置 open / close 方法，控制 dialogs 的显隐</p>
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
  </div>
</template>
<script>
import useCode from "!!raw-loader!@/view/main.js";
import page1 from "@/components/page1";
import page1Code from "!!raw-loader!@/components/page1.vue";
import page2 from "@/components/page2";
import page2Code from "!!raw-loader!@/components/page2.vue";
export default {
  name: "page",
  components: { page1, page2 },
  data() {
    return {
      installCode: "npm i @xsyx/vue-dialogs -S",
      useCode,
      page1Code,
      page2Code,
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