# vue-dialogs 介绍
vue-dialogs 主要提供如下能力：
- 项目中 `dialog` 集中式管理
- `dialog` 全局命令式调用
- 单例模式，性能较好

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

# 用法

### 安装
```shell
cnpm i -S @xsyx/vue-dialogs
```

### 使用
##### main.js
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

使用起来更简单

```javascript
  // 在任何组件中，可以通通过全局的方式直接使用
  mounted(){

    // ...
    
    this.$dialogs.dsEdit.show()
  }
```