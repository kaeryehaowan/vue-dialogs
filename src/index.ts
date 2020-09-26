const _dialogMap = Symbol("_dialogMap");
const _getComponent = Symbol("_getComponent");
const _render = Symbol("_render");
const _componentType = Symbol("dialog");
const isObject = (s: any) => typeof s === "object" && s !== null;
export default class VueDialogs {
  private _dialogComponents: Array<any> = [];
  constructor(dialogMap: any = {}) {
    this[_dialogMap] = dialogMap;
  }
  [_getComponent](name: string) {
    return this[_dialogMap][name];
  }
  [_render]() {
    Object.keys(this[_dialogMap]).forEach(async (dialogMapKey: string) => {
      let dialog: any = this[_getComponent](dialogMapKey);
      if (isObject(dialog)) {
        this._dialogComponents.push({
          component: dialog,
          dialogMapKey,
        });
      }
    });
  }
  static install(Vue) {
    let _dialogs = {};
    let _VNode = {};
    Vue.mixin({
      created() {
        if (
          this.$vnode &&
          this.$vnode.data &&
          this.$vnode.data._componentType === _componentType
        ) {
          _dialogs[this.$vnode.data._dialogMapKey] = {
            instance: this,
            isAppendChild: false,
          };
        }
      },
      mounted() {
        if (this.$options.dialogs && this.$root === this) {
          // 生成 dialogs 挂载容器
          let _container = new Vue({
            name: "dialog-container",
            render(h) {
              return h("div", { attrs: { id: "__dialog__container__" } });
            },
          }).$mount();
          this.$root.$el.appendChild(_container.$el);
          // 收集 dailogs
          this.$options.dialogs[_render]();
          const dialogList = this.$options.dialogs._dialogComponents;
          dialogList.map((DialogComponent) => {
            _dialogs[DialogComponent.dialogMapKey] = {
              instance: null,
              isAppendChild: false,
            };
            // 实例化 dialogs 组件
            _VNode[DialogComponent.dialogMapKey] = new Vue({
              name: `extend${DialogComponent.dialogMapKey}`,
              render(h) {
                return h(DialogComponent.component, {
                  _componentType: _componentType,
                  _dialogMapKey: DialogComponent.dialogMapKey,
                });
              },
            }).$mount();
          });
          Object.defineProperty(Vue.prototype, "$dialogs", {
            get() {
              // 使用 Proxy 截持，动态挂载
              let proxyDialogs = new Proxy(_dialogs, {
                get(target, propKey) {
                  let _proxyDialog = Reflect.get(target, propKey);
                  if (!_proxyDialog.isAppendChild) {
                    _proxyDialog.isAppendChild = true;
                    document
                      .getElementById("__dialog__container__")
                      .appendChild(_VNode[propKey].$el);
                  }
                  return _proxyDialog.instance;
                },
              });
              return proxyDialogs;
            },
          });
        }
      },
    });
  }
}
