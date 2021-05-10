import { author, unauth } from "@/service";
import router from "@/router";
var app = {
  state: {
    submenu: null,
    sideSubmenuOpened: false,
    wkNum: "",
    menuNameL1: "",
    tagList: []
  },
  mutations: {
    selectedSubmenu(state, payload) {
      state.submenu = payload.submenu;
    },
    closeSubmenu(state, payload) {
      state.submenu = null;
      state.sideSubmenuOpened = false;
    },
    openSubmenu(state, payload) {
      state.submenu = payload.submenu;
      state.sideSubmenuOpened = true;
    },
    setwkNum(state, payload) {
      state.wkNum = payload.wkNum;
    },
    setMenuNameL1(state, payload) {
      state.menuNameL1 = payload.menuNameL1;
    },
    setTagList(state, payload) {
      if (!state.tagList.find(e => e.fullPath == payload.fullPath)) {
        state.tagList.push(payload)
      }
    }
  },
  getters: {
    getSubmenu(state) {
      return state.submenu;
    },
    sideSubmenuOpened(state) {
      return state.sideSubmenuOpened;
    },
    getwkNum(state) {
      return state.wkNum;
    },
    getMenuNameL1(state) {
      return state.menuNameL1;
    },
    getTagList(state) {
      return state.tagList
    }
  }
};
export default app;
