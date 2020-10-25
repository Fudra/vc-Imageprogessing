// import { ActionContext } from "vuex";
// import { RootState } from "@/store/index";
// import { ImageTypes } from "@/interfaces";
//
// export interface LoadedImageState {
//   imageOriginal: HTMLImageElement | null;
//   imageModified: HTMLImageElement | null;
//   imageDataOriginal: ImageData | null;
//   imageDataModified: ImageData | null;
//   lastChangedModified: number;
// }
//
// const mutationTypes = {
//   IMAGE_LOADED: "IMAGE_LOADED",
//   MODIFY_IMAGE: "MODIFY_IMAGE",
//   SET_IMAGE_DATA: "SET_IMAGE_DATA"
// };
//
// export default {
//   namespaced: true,
//   state: {
//     imageOriginal: null,
//     imageModified: null,
//     imageDataOriginal: null,
//     imageDataModified: null,
//     lastChangedModified: Date.now()
//   } as LoadedImageState,
//   getters: {
//     original: (state: LoadedImageState) =>
//       state.imageOriginal as HTMLImageElement | null,
//     originalData: (state: LoadedImageState) =>
//       state.imageDataOriginal as ImageData | null,
//
//     modified: (state: LoadedImageState) =>
//       state.imageModified as HTMLImageElement | null,
//     modifiedData: (state: LoadedImageState) =>
//       state.imageDataModified as ImageData | null,
//
//     lastChangedModified: (state: LoadedImageState) => state.lastChangedModified
//   },
//   mutations: {
//     [mutationTypes.IMAGE_LOADED](
//       state: LoadedImageState,
//       image: HTMLImageElement
//     ) {
//       console.log("mutationTypes.IMAGE_LOADED");
//       state.imageOriginal = image;
//       state.imageModified = image;
//     },
//     [mutationTypes.MODIFY_IMAGE](
//       state: LoadedImageState,
//       image: HTMLImageElement
//     ) {
//       console.log("mutationTypes.MODIFY_IMAGE");
//       state.imageModified = image;
//     },
//     [mutationTypes.SET_IMAGE_DATA](
//       state: LoadedImageState,
//       payload: { imageData: ImageData; type: ImageTypes }
//     ) {
//       switch (payload.type) {
//         case ImageTypes.ORIGINAL:
//           state.imageDataOriginal = payload.imageData;
//           break;
//         case ImageTypes.MODIFIED:
//           state.imageDataModified = null;
//           state.imageDataModified = payload.imageData;
//           // state.lastChangedModified = Date.now()
//           break;
//       }
//
//       console.log("mutationTypes.SET_IMAGE_DATA ", payload.type);
//     }
//   },
//   actions: {
//     setImage(
//       { commit }: ActionContext<LoadedImageState, RootState>,
//       payload: { image: string }
//     ) {
//       const imageElement = new Image();
//       imageElement.src = payload.image;
//
//       commit(mutationTypes.IMAGE_LOADED, imageElement);
//     },
//     modifyImage(
//       { commit }: ActionContext<LoadedImageState, RootState>,
//       payload: { image: string }
//     ) {
//       const imageElement = new Image();
//       imageElement.src = payload.image;
//
//       commit(mutationTypes.MODIFY_IMAGE, imageElement);
//     },
//     setImageData(
//       { commit }: ActionContext<LoadedImageState, RootState>,
//       payload: { imageData: ImageData | null; type: ImageTypes }
//     ) {
//       console.log("setnewimagedata");
//       commit(mutationTypes.SET_IMAGE_DATA, payload);
//     }
//   }
// };
