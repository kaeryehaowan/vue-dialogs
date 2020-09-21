# XSFE Dialogs「集中式」解决方案

> 仓库地址：[https://gitlab.frxs.cn/xsfe-utils/vue-dialogs.git](https://gitlab.frxs.cn/xsfe-utils/vue-dialogs.git)



<a name="rLRfb"></a>
# 何谓集中式管理
![image.png](https://cdn.nlark.com/yuque/0/2020/png/84824/1600688420538-7fea77b2-29de-431e-bfa5-c4c5115be685.png#align=left&display=inline&height=160&margin=%5Bobject%20Object%5D&name=image.png&originHeight=160&originWidth=285&size=11736&status=done&style=none&width=285)<br />如图，项目中所有「弹窗组件」全部收纳到一处<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/84824/1600688625952-4560f8dd-7314-4531-966d-a722735f2626.png#align=left&display=inline&height=151&margin=%5Bobject%20Object%5D&name=image.png&originHeight=151&originWidth=495&size=20721&status=done&style=none&width=495)<br />清晰的弹框配置<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/84824/1600688552291-b92e61c3-41b2-4c0d-b3ef-c60a0634dc94.png#align=left&display=inline&height=146&margin=%5Bobject%20Object%5D&name=image.png&originHeight=146&originWidth=316&size=12893&status=done&style=none&width=316)<br />使用时直接全局调用<br />

<a name="mDc0g"></a>
# vue-dialogs 介绍
vue-dialogs 解决如下问题：

- 项目中 `dialog` 分散的到处都是
- 每个页面引入 `dialog` 时都需要在页面 `template` 中添加如下代码



```vue
<template>
  <div>
    ...
    <a-dialog></a-dialog>
  </div>
</template>
```


- 当 `dialog` 位置发生变化时，每个页面都需要改动
- ...



<a name="bc120b21"></a>
# 用法
<a name="qbVc8"></a>
## 安装
```shell
cnpm i -S @xsyx/vue-dialogs
```


<a name="tHqv9"></a>
## 配置
<a name="6dej5"></a>
### JavaScript
```javascript
// 导入
import VueDialogs from '@xsyx/vue-dialogs'
// 注册插件
Vue.use(VueDilogs);

// 像配置 路由一样配置 dialogs
const dialogs = new VueDialogs({
  dialogs:[
    {name: 'dsEdit', component: DataSourceEditor}
  ],
})

// 使用
new Vue({
  el: '#app',

  dialogs,  // 挂载到全局

  router,
  vuex
})
```
<a name="2KSSH"></a>
### HTML
```html
<div id="app">
  <h1>Hello App!</h1>
  
  <!-- 弹框匹配到的组件渲染在这里 -->
  <jv-dialogs></jv-dialogs>
</div>
```
> 为什么要这么做，因为弹窗也是dom，仍然需要找个节点挂一下



<a name="snqZz"></a>
## 使用
使用起来更简单<br />

```javascript
// 在任何组件中，可以通通过全局的方式直接使用
// 无需额外引入组件或者什么其他的
mounted(){

  // ...

  this.$dialogs.dsEdit.show()
}
```


