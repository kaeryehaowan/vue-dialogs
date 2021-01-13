<template>
  <el-dialog :visible.sync="show" title="dialog2">
    <p>
      这是接收到的参数： <span class="red">{{propsName}}</span>
    </p>
    <p>
      接收到的count值为： <span class="red">{{count}}</span>
    </p>
  </el-dialog>
</template>

<script>
export default {
  name: "dialog_2",
  data() {
    return {
      show: false,
      count: 10,
      propsName: ''
    };
  },
  methods: {
    open(data){
      this.show = true
      this.propsName = data.name
      this.count = data.count
    },
    close(){
      this.show = false
    },
    emit(cb){
      cb(`这是来自 dialog2 的消息,count来自dialog,count: ${this.count}`)
    }
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
