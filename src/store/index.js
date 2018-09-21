import Vue from 'vue';
import Vuex from 'vuex';
import { textActiveOff } from '../util/tools';
import editor from './editor';
import page from './page';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
  },
  modules: {
    editor,
    page,
  },
  mutations: {
    inactive_drags(state, payload) {
      state.editor[payload.arr] = textActiveOff(state.editor[payload.arr], payload);
    },
    del_drag(state, payload) {
      state.editor[payload.arr] = state.editor[payload.arr].filter((item, key) => key !== payload.index);
      if (!state.editor[payload.arr].length) {
        const k = payload.active.substring(2);
        const activeK = k.slice(0, 1).toLowerCase() + k.slice(1);
        state.editor[activeK] = false;
      }
      state.editor.layoutKey = state.editor.layoutKey - 1;
    },
    /* 图片组件操作 */
    add_drag_img(state) {
      const textTop = ((state.page.phoneHeight / 2) - 30) / 2;
      const zIndex = state.editor.dragTexts.length
        ? state.editor.dragTexts[state.editor.dragTexts.length - 1].zIndex + 1 : 0;
      state.editor.dragImages.push({
        isShow: true,
        zIndex,
        y: textTop,
        isActive: true,
        dragIndex: zIndex,
      });
    },
    /* 图层管理-图层拖拽排序 */
    layer_move(state, payload) {
      state.editor.layerLists = payload.layerLists;
      state.editor.layerActive = payload.newIndex;
    },
    editor_update(state, payload) {
      state.editor = { ...state.editor, ...payload };
    },
    page_update(state, payload) { // 页面信息更新
      state.page = { ...state.page, ...payload };
    },
  },
  actions: {
    layerMove({ commit }, payload) {
      commit('layer_move', payload);
    },
    setting_tap({ commit, state }, payload) {
      const update = {};
      const { typeCat } = state.editor;
      for (const k in typeCat) {
        const tag = typeCat[k][2];
        if (state.editor[tag]) {
          update[tag] = false;
        }
      }
      if (JSON.stringify(update) !== '{}') {
        commit('editor_update', update);
      }
      commit('page_update', payload);
    },
  },
});
