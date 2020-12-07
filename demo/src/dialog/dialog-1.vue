<template>
    <el-dialog :visible.sync='show' title="dialog1">
        <p>dialog1 组件</p>
        <el-button @click="cb">on</el-button>
    </el-dialog>
</template>

<script>
export default {
  name: 'dialog_1',
  data() {
    return {
      show: false
    }
  },
  methods: {
    open(){
      this.show = true
    },
    cb(){
      this.$router.push({
        path: '/about'
      })
      console.log(this)
      // this.$emit('callback',{name: 'dialog_1'})
    }
  }
}
</script>

