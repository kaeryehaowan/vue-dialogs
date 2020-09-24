<template>
  <div class="page1">
    <el-button size="mini" class="button" @click.stop="showDialog">显示 dialog</el-button>
  </div>
</template>
<script>
export default {
  name: "page1",
  methods: {
    showDialog() {
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
            this.$alert(
              `这是 dialog1 组件里的 data.name: ${data.name}`,
              "dialog组件 emit 的事件回调"
            );
          },
        },
      });
    },
  },
};
</script>
<style scoped>
.button{
  margin: 10px 0;
}
</style>