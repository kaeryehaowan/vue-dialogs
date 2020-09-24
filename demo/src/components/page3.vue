<template>
  <div class="page3">
    <el-button size="mini" v-dialog:click.stop="{name: 'dia3'}" class="button">显示 dialog</el-button>
  </div>
</template>
<script>
export default {
  name: "page3"
};
</script>
<style scoped>
.button {
  margin: 10px 0;
}
</style>