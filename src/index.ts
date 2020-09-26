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
    let dialogs = {};
    Vue.mixin({
      created() {
        if (
          this.$vnode &&
          this.$vnode.data &&
          this.$vnode.data._componentType === _componentType
        ) {
          dialogs[this.$vnode.data._dialogMapKey] = this;
        }
      },
      mounted() {
        if (this.$options.dialogs && this.$root === this) {
          this.$options.dialogs[_render]();
          let _this = this;
          const container = new Vue({
            name: "dialog-container",
            render(h) {
              const dialogList = _this.$options.dialogs._dialogComponents;
              return h(
                "div",
                {},
                dialogList.map((DialogComponent) => {
                  return h(DialogComponent.component, {
                    _componentType: _componentType,
                    _dialogMapKey: DialogComponent.dialogMapKey,
                  });
                })
              );
            },
          }).$mount();
          document.body.appendChild(container.$el);
          Object.defineProperty(Vue.prototype, "$dialogs", {
            get() {
              return dialogs;
            },
          });
        }
      },
    });
  }
}
