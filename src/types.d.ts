import { IpcRenderer } from "electron";
import Vue from "vue";

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    // isoDataMixin
    calculateP(data: number[], min: number, max: number): number;

    calculateU(data: number[], p: number, min: number, max: number): number;

    newT(uak: number, ubk: number): number;

    //outlineMixin
    convertImageDataToArrayValue(imageData: ImageData): number[];

    convertArrayValueToImageData(data: number[], width: number): ImageData;

    invertData(data: number[]): number[];

    imageCapImageDashed(
      image: number[],
      imageDashed: number[],
      dataInverted: boolean
    ): number[];

    dilation(imageData: ImageData, data: number[]): number[];

    applyMaskAtPosition(
      imageData: ImageData,
      data: number[],
      x: number,
      y: number
    ): boolean;

    getMaskValue(x: number, y: number): number;
  }
}
