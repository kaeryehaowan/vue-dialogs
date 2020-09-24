<template>
  <div class="page2">
    <el-button size="mini" class="button" @click.stop="showDialog">显示 dialog</el-button>
  </div>
</template>
<script>
export default {
  name: "page2",
  methods: {
    showDialog() {
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
};
</script>
<style scoped>
.button {
  margin: 10px 0;
}
</style>