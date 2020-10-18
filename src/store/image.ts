import { ActionContext } from "vuex";
import { RootState } from "@/store/index";

export interface LoadedImageState {
  imageDate: HTMLImageElement | null;
}

const mutationTypes = {
  IMAGE_LOADED: "IMAGE_LOADED"
};

export default {
  namespaced: true,
  state: {
    imageDate: null
  } as LoadedImageState,
  getters: {
    imageDate: (state: LoadedImageState) => state.imageDate
  },
  mutations: {
    [mutationTypes.IMAGE_LOADED](
      state: LoadedImageState,
      image: HTMLImageElement
    ) {
      state.imageDate = image;
    }
  },
  actions: {
    setImage(
      { commit }: ActionContext<LoadedImageState, RootState>,
      payload: { image: string }
    ) {
      const imageElement = new Image();
      imageElement.src = payload.image;

      commit(mutationTypes.IMAGE_LOADED, imageElement);
    }
  }
};
