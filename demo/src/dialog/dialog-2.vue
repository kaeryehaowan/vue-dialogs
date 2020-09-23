<template>
  <el-dialog :visible.sync="show" title="dialog2">
    可通过 uid 对组件实例进行操作。(下例 2 秒之后修改 name 值，再过 2 秒关闭 dialog)
    <p>
      组件内的 data.name:
      <span class="red">{{name}}</span>
      <span class="yellow">{{time}}</span>
    </p>
  </el-dialog>
</template>

<script>
export default {
  name: "dialog_2",
  data() {
    return {
      show: false,
      name: "内部值",
      time: 4,
    };
  },
  created() {
    this.timer = setInterval(() => {
      console.log("kael");
      if (this.time < 1) {
        clearInterval(this.timer);
      } else {
        this.time--;
      }
    }, 1000);
  },
};
</script>
<style scoped>
.red {
  color: #f56c6c;
}
.yellow {
  color: #e6a23c;
}
</style>
