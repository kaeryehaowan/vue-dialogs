const _dialogMap = Symbol("_dialogMap");
const _getComponent = Symbol("_getComponent");
const _render = Symbol("_render");
const _componentType = Symbol("dialog");
const isObject = (s: any) => typeof s === "object" && s !== null;
export default class VueDialogs {
  private _dialogComponents: Array<any> = [];
  constructor(dialogMap: any = {}) {
    this[_dialogMap] = {}
    dialogMap.dialogs.forEach(key => {
      this[_dialogMap][key.name] = key.component
    })
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
    let _root = null;
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
        if (this.$options.dialog && this.$root === this) {
          _root = this
          // 收集 dailogs
          this.$options.dialog[_render]();
          const dialogList = this.$options.dialog._dialogComponents;
          // 因对 this.$root.$options.dialog 进行merge时，会有循环引用的问题。所以先缓存
          const _dialogCache = _root.$options.dialog
          delete _root.$options.dialog
          dialogList.map((DialogComponent) => {
            _dialogs[DialogComponent.dialogMapKey] = {
              instance: null,
              isAppendChild: false,
            };
            // 实例化 dialogs 组件
            _VNode[DialogComponent.dialogMapKey] = new Vue(Object.assign(_root.$options,{
              name: `extend${DialogComponent.dialogMapKey}`,
              render(h) {
                return h(DialogComponent.component, {
                  _componentType: _componentType,
                  _dialogMapKey: DialogComponent.dialogMapKey,
                });
              },
            })).$mount();
          });
          _root.$options.dialog = _dialogCache;
          Object.defineProperty(Vue.prototype, "$dialogs", {
            get() {
              // 使用 Proxy 截持，动态挂载
              let proxyDialogs = new Proxy(_dialogs, {
                get(target, propKey) {
                  let _proxyDialog = Reflect.get(target, propKey);
                  if (!_proxyDialog.isAppendChild) {
                    _proxyDialog.isAppendChild = true;
                    _root.$el.appendChild(_VNode[propKey].$el);
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
