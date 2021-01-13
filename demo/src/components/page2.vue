<template>
  <div class="page2">
    <el-button size="mini" class="button" @click.stop="dialogShow1"
      >传入数据</el-button
    >
    <el-button size="mini" class="button" @click.stop="dialogShow2"
      >接收数据</el-button
    >
  </div>
</template>
<script>
export default {
  name: "page2",
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    dialogShow1() {
      // this.$dialogs.dia2.open({
      //   name: "我是 page2 传入的参数",
      //   count: this.count++
      // });
      // 或者
      this.$dialogs.dia2.show = true
      this.$dialogs.dia2.count = this.count++
      this.$dialogs.dia2.propsName = '我是 page2 传入的参数'
    },
    dialogShow2() {
      this.$dialogs.dia2.emit((data) => {
        this.$notify({
          title: "收到 dialog 的参数",
          message: data,
          type: "success",
          duration: 0,
        });
      });
      setTimeout(this.dialogClose,3000)
    },
    dialogClose(){
      this.$dialogs.dia2.close()
      // 获取 dialog 的数据
      console.log(this.$dialogs.dia2.count)
    }
  },
};
</script>
<style scoped>
.button {
  margin: 10px 0;
}
</style>