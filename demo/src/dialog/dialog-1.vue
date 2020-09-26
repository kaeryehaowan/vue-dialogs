<template>
    <el-dialog :visible.sync='show' title="dialog1">
        <el-form>
          <el-form-item label="name">String：{{name}}</el-form-item>
          <el-form-item label="age">Number：{{age}}</el-form-item>
          <el-form-item label="sex">String：{{sex}}</el-form-item>
          <el-form-item label="list">Array：{{list}}</el-form-item>
        </el-form>
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
  props: {
    name: {
      type: String ,
      default: ''
    },
    age: {
      type: Number ,
      default: 18
    },
    sex: {
      type: String ,
      default: '男'
    },
    list: {
      type: Array ,
      default: ()=>[]
    },
  },
  methods: {
    open(){
      this.show = true
    },
    cb(){
      this.$emit('callback',{name: 'dialog_1'})
    }
  }
}
</script>

