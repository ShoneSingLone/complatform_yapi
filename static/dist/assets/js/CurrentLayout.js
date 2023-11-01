import { d as defineComponent, a9 as defineAsyncComponent, s as stateApp, aB as reactive, b as defItem, f as xU, b0 as stateMusic, p as watch, b1 as Actions_Music, a_ as __vitePreload, H as _export_sfc, r as resolveComponent, I as openBlock, a$ as createBlock } from "./index.js";
const state = reactive({
  configs: {
    search: defItem({
      value: "",
      prop: "search",
      placeholder: "\u6807\u9898\u3001\u6B4C\u624B\u3001\u6240\u5C5E\u4E13\u8F91",
      allowClear: true
    }),
    items: []
  }
});
const setItems = xU.debounce(function(search) {
  let allItems = stateMusic.playlist;
  if (search) {
    allItems = xU.filter(allItems, (record) => {
      const isOk = (prop) => new RegExp(search, "ig").test(record[prop]);
      return isOk("title") || isOk("artist") || isOk("album");
    });
  }
  state.configs.items = allItems;
}, 600);
watch(() => stateMusic.playlist.length, () => {
  setItems(state.configs.search.value);
}, {
  immediate: true
});
watch(() => state.configs.search.value, setItems, {
  immediate: true
});
const btnClear = {
  text: "\u79FB\u9664\u6240\u6709",
  async onClick() {
    if (state.configs.search.value) {
      xU.each(state.configs.items, Actions_Music.removeSongFromPlaylist);
    } else {
      Actions_Music.clearPlaylist();
    }
  }
};
const _sfc_main = defineComponent({
  components: {
    CurrentMobile: defineAsyncComponent(() => __vitePreload(() => import("./CurrentMobile.js"), true ? ["./CurrentMobile.js","./index.js","..\\index.css","./CurrentMobileSongItem.js","..\\CurrentMobileSongItem.css"] : void 0, import.meta.url)),
    CurrentPc: defineAsyncComponent(() => __vitePreload(() => import("./CurrentPc.js"), true ? ["./CurrentPc.js","./index.js","..\\index.css","./CurrentMobileSongItem.js","..\\CurrentMobileSongItem.css"] : void 0, import.meta.url))
  },
  setup() {
    return {
      stateApp
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CurrentMobile = resolveComponent("CurrentMobile");
  const _component_CurrentPc = resolveComponent("CurrentPc");
  return _ctx.stateApp.useMobileView ? (openBlock(), createBlock(_component_CurrentMobile, { key: 0 })) : (openBlock(), createBlock(_component_CurrentPc, { key: 1 }));
}
const CurrentLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  btnClear,
  CurrentLayout as default,
  setItems,
  state
};
