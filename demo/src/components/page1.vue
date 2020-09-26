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
      this.$dialogs.dia1.open()
    },
  },
};
</script>
<style scoped>
.button{
  margin: 10px 0;
}
</style>