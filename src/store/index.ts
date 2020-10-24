import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {}

import image from "@/store/image";
import binarize from "@/store/binarize";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    image,
    binarize
  }
});
