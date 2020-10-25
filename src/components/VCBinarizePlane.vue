<template>
  <div class="space-y-6">
    <h3 class="text-sm uppercase leading-relaxed text-gray-700 font-semibold">
      Binarize
    </h3>

    <div class="">
      <label
        for="methode"
        class="block text-sm font-medium leading-5 text-gray-700"
        >Method</label
      >
      <select
        id="methode"
        v-model="method"
        class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      >
        <option value="copy">Copy Data</option>
        <option value="threshold">Threshold</option>
        <option value="isodata">ISO DATA</option>
      </select>
    </div>

    <div class="">
      <label
        for="threshold"
        class="block text-sm font-medium leading-5 text-gray-700"
        >Threshold</label
      >
      <input
        id="threshold"
        type="range"
        v-model="threshold"
        min="0"
        max="255"
        value="128"
        class="block form-range w-full py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      />
    </div>

    <div class="flex items-center">
      <input
        id="outline"
        name="outline"
        type="checkbox"
        v-model="outline"
        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
      <label for="outline" class="ml-3">
        <span class="block text-sm leading-5 font-medium text-gray-700"
          >Outline</span
        >
      </label>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue, { PropType } from "vue";
import {ImageTypes, ModifiedImage} from "@/interfaces";

interface VCBinarizeData {
  threshold: number;
  method: string;
  outline: boolean;
}

export default Vue.extend({
  name: "VCBinarizePlane",
  data() {
    return {
      threshold: 128,
      method: "copy",
      outline: true
    } as VCBinarizeData;
  },
  props: {
    image: {
      type: Object as PropType<ModifiedImage>,
      required: true
    }
  },
  methods: {
    copyImage() {
      console.log(this.image)
      const data = new Uint8ClampedArray(this.image.imageData.data);
      // emit image change
      this.$emit("imageChange", {
        imageData: new ImageData(data, 600),
        type: ImageTypes.MODIFIED,
        changed: Date.now()
      });
    },
    async binarizeWithThreshold(threshold: number) {
      console.log(this.image.imageData)
      console.log("threshold", threshold);
      // get image
      const data =  new Uint8ClampedArray(this.image.imageData.data)

      // calculate argb to grayscale
      for (let i = 0; i < data.length; i = i + 4) {
        let gray = data[i]; // R
        gray += data[i + 1]; // G
        gray += data[i + 2]; // B
        // gray += data[i + 3]; // A

        gray = Math.round(gray / 3);
        //const v
        let value = Math.random() * 255; //
        value =  gray > threshold ? 255 : 0;

        // set pixel
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      // emit image change
      this.$emit("imageChange", {
        imageData: new ImageData(data, 600),
        type: ImageTypes.MODIFIED,
        changed: Date.now()
      });
      // await this.$store.dispatch("image/setImageData", {
      //   imageData: new ImageData(data, 600),
      //   type: ImageTypes.MODIFIED
      // });
    },
    colorMask(pixel: number, shift: number) {
      return (pixel >> shift) & 0xff;
    },
    maskRed(pixel: number): number {
      return this.colorMask(pixel, 16);
    },
    maskGreen(pixel: number): number {
      return this.colorMask(pixel, 8);
    },
    maskBlue(pixel: number): number {
      return this.colorMask(pixel, 0);
    }
  },
  watch: {
    threshold: {
      handler(value: number) {
        this.binarizeWithThreshold(value);
      }
    },
    method: {
      handler(value: string) {
        switch (value) {
          case "copy":
            this.copyImage();
                break;
          case "threshold":
              this.binarizeWithThreshold(this.threshold)
             break;
          case "isodata":
            break;
        }
      },
      immediate: true
    }
  }
});
</script>
