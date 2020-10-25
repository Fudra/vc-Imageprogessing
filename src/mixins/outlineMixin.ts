import Vue from "vue";

export default Vue.extend({
  methods: {
    convertImageDataToArrayValue(imageData: ImageData): number[] {
      const data: number[] = [];

      for (let i = 0; i < imageData.data.length; i = i + 4) {
        data.push(imageData.data[i]);
      }

      return data;
    },

    convertArrayValueToImageData(data: number[], width: number): ImageData {
      const expandData: number[] = [];

      for (let i = 0; i < data.length; i++) {
        expandData.push(
          data[i], // R
          data[i], // R
          data[i], // R
          255 // A
        );
      }

      return new ImageData(new Uint8ClampedArray(expandData), width);
    },

    invertData(data: number[]): number[] {
      const invData: number[] = [];

      for (let i = 0; i < data.length; i++) {
        invData.push(data[i] === 0 ? 255 : 0);
      }

      return invData;
    },

    imageCapImageDashed(
      image: number[],
      imageDashed: number[],
      dataInverted: boolean
    ): number[] {
      const result: number[] = [];

      const invImage = dataInverted
        ? imageDashed
        : this.invertData(imageDashed);

      for (let i = 0; i < image.length; i++) {
        result.push(invImage[i] === 0 ? image[i] : 255);
      }

      return result;
    },

    dilation(imageData: ImageData, data: number[]): number[] {
      const dataDashed: number[] = [];

      for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
          if (this.applyMaskAtPosition(imageData, data, x, y)) {
            dataDashed.push(255);
          } else {
            dataDashed.push(0);
          }
        }
      }

      return dataDashed;
    },

    applyMaskAtPosition(
      imageData: ImageData,
      data: number[],
      x: number,
      y: number
    ): boolean {
      let isApplicable = true;

      for (let yPos = -1; yPos <= 1; yPos++) {
        const calcY = y + yPos;

        if (calcY < 0 || calcY > imageData.height) {
          continue;
        }

        for (let xPos = -1; xPos <= 1; xPos++) {
          const calcX = x + xPos;

          if (calcX < 0 || calcX > imageData.width) {
            continue;
          }

          if (this.getMaskValue(xPos, yPos)) {
            isApplicable =
              isApplicable && data[calcY * imageData.width + calcX] === 255;
          }
        }
      }

      return isApplicable;
    },

    getMaskValue(x: number, y: number): number {
      // r = 1
      const H = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];

      return H[x + 1][y + 1];
    }
  }
});
