export default class VueDialogs{
  static dialogsConfig = []
  static dialogsRenders={};
  static instance={}; // 组件实例
  static dialogs={}; // 弹窗实例
  constructor({dialogs}){
    VueDialogs.dialogsConfig = dialogs;
  }

  static install(Vue, options){
    // const isDef = v => v !== undefined
    // Vue.mixin({
    //   created () {
    //     if (isDef(this.$options.dialogs)) {
    //         // do nothing
    //     }
    //   },
    // })
    Object.defineProperty(Vue.prototype, '$dialogs', {
      get () { 
        const _dialogs = {};
        Object.keys(VueDialogs.dialogs).map(key=>{
          if(VueDialogs.dialogs[key]) _dialogs[key] = VueDialogs.dialogs[key].componentInstance
        })
        return _dialogs
      }
    })
    
    Vue.component('jv-dialogs', {
      render(h, conetxt) {
        VueDialogs.instance = this;
        const children = VueDialogs.dialogsConfig.map(({name, component})=>{
          return VueDialogs.dialogs[name] = h(component);
        })
        return h('div', {}, children );
      },
    });
  }
}
