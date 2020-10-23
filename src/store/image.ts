import { ActionContext } from "vuex";
import { RootState } from "@/store/index";

export interface LoadedImageState {
  imageDataOriginal: HTMLImageElement | null;
  imageDataModified: HTMLImageElement | null;
}

const mutationTypes = {
  IMAGE_LOADED: "IMAGE_LOADED",
  MODIFY_IMAGE: "MODIFY_IMAGE",
};

export default {
  namespaced: true,
  state: {
    imageDataOriginal: null,
    imageDataModified: null,
  } as LoadedImageState,
  getters: {
    original: (state: LoadedImageState) => state.imageDataOriginal as ( HTMLImageElement | null),
    modified: (state: LoadedImageState) => state.imageDataModified as ( HTMLImageElement | null),
  },
  mutations: {
    [mutationTypes.IMAGE_LOADED](
      state: LoadedImageState,
      image: HTMLImageElement
    ) {
      state.imageDataOriginal = image;
      state.imageDataModified = image;
    },
    [mutationTypes.MODIFY_IMAGE](
        state: LoadedImageState,
        image: HTMLImageElement
    ) {
      state.imageDataModified = image;
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
    },
   modifyImage(
        { commit }: ActionContext<LoadedImageState, RootState>,
        payload: { image: string }
    ) {
      const imageElement = new Image();
      imageElement.src = payload.image;

      commit(mutationTypes.MODIFY_IMAGE, imageElement);
    }
  }
};
