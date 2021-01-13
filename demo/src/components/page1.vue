<template>
  <div class="page1">
    <h4 v-if="false">
      使用$on注册事件后，请自行在合适的时机 off ，常在 beforeDestroy
      钩子里做这件事。
    </h4>
    <el-button size="mini" class="button" @click.stop="showDialog"
      >显示 dialog</el-button
    >
  </div>
</template>
<script>
export default {
  name: "page1",
  methods: {
    showDialog() {
      this.$dialogs.dia1.open();
      this.$dialogs.dia1.$on("callback", (data) => {
        this.$notify({
          title: "使用 emit / on 来实现 dialog 与 调用组件 的通信",
          message: data,
          type: "success",
          duration: 0,
        });
      });
    },
  },
  beforeDestroy() {
    this.$dialogs.dia1.$off("callback");
  },
};
</script>
<style scoped>
.button {
  margin: 10px 0;
}
</style>