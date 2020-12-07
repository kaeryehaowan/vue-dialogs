# XSFE Dialogs「集中式」解决方案

> 仓库地址：[https://gitlab.frxs.cn/xsfe-utils/vue-dialogs.git](https://gitlab.frxs.cn/xsfe-utils/vue-dialogs.git)

## vue-dialogs v0.1.5

统一注册，可在页面任何地方通过注册时的 key ，获取到 dialog 组件实例。继而就可以对 dialog 进行任何操作。

## Installation

```js
npm i @xsyx/vue-dialogs -S
```

## Usage

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Dialogs from '@xsyx/vue-dialogs'
import dialog1 from "@/dialog/dialog-1.vue";
import dialog2 from "@/dialog/dialog-2.vue";

Vue.use(Dialogs);

let dialogs = [
  {
    name: "dia1",
    component: dialog1,
  },
  {
    name: "dia2",
    component: dialog2,
  },
];

const dialog = new Dialogs({ dialogs});

new Vue({
  router,
  dialog,
  render: (h) => h(App),
}).$mount("#app");

```

```vue
// page.vue
<template>
  <div>
    <button @click="dialogShow">打开 dialog</button>
  </div>
</template>
<script>
export default {
  methods: {
    dialogShow(){
      this.$dialogs.dia2.open({
        name: "我是 page2 传入的参数",
        count: this.count++
      });

      // 或者
      this.$dialogs.dia2.show = true
      this.$dialogs.dia2.count = this.count++
      this.$dialogs.dia2.propsName = '我是 page2 传入的参数'

    },
    dialogClose(){
      this.$dialogs.dia2.close()
      // 或者
      this.$dialogs.dia2.show = false
      // 获取 dialog 的数据
      console.log(this.$dialogs.dia2.count)
    }
  }
}
</script>
```

```vue
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
  name: "dialog_3",
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
  }
};
</script>
```
