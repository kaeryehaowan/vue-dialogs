<template>
    <el-dialog :visible.sync='show' title="dialog3">
      这是通过 v-dialog 打开的 dialog
    </el-dialog>
</template>

<script>
export default {
  name: 'dialog_3',
  data() {
    return {
      show: false
    }
  }
}
</script>

