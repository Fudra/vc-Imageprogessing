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
        >Threshold
        <span class="text-gray-600 text-right">({{ threshold }})</span>
      </label>
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
        v-model="hasOutline"
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
import Vue, {PropType} from "vue";
import {ImageTypes, ModifiedImage} from "@/interfaces";
import isoDataMixin from "@/mixins/isoDataMixin";
import outlineMixin from "@/mixins/outlineMixin";

interface VCBinarizeData {
  threshold: number;
  method: string;
  hasOutline: boolean;
}

export default Vue.extend({
  name: "VCBinarizePlane",
  mixins: [isoDataMixin, outlineMixin],
  data() {
    return {
      threshold: 128,
      method: "copy",
      hasOutline: false
    } as VCBinarizeData;
  },
  props: {
    image: {
      type: Object as PropType<ModifiedImage>,
      required: true
    },
    grayColorCount: {
      type: Array as PropType<Array<number>>,
      required: true,
    }
  },
  methods: {
    copyImage() {
      const data = new Uint8ClampedArray(this.image.imageData.data);
      // emit image changed
      this.$emit("imageChange", {
        imageData: new ImageData(data, 600),
        type: ImageTypes.MODIFIED,
        changed: Date.now()
      });
    },
    async binarizeWithThreshold(threshold: number) {
      // get image
      const data = new Uint8ClampedArray(this.image.imageData.data)

      // calculate argb to grayscale
      for (let i = 0; i < data.length; i = i + 4) {
        let gray = data[i]; // R
        gray += data[i + 1]; // G
        gray += data[i + 2]; // B
        // gray += data[i + 3]; // A

        gray = Math.round(gray / 3);
        const value = gray > threshold ? 255 : 0;

        // set pixel
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }

      if (this.hasOutline) {

        this.$emit("imageChange", {
          imageData: this.outline(new ImageData(data, 600)),
          type: ImageTypes.MODIFIED,
          changed: Date.now()
        });

        return;
      }

      // emit image change
      this.$emit("imageChange", {
        imageData: new ImageData(data, 600),
        type: ImageTypes.MODIFIED,
        changed: Date.now()
      });
    },
    isoData() {
      const data = new Uint8ClampedArray(this.image.imageData.data);

      let countData = this.grayColorCount;

      // isodata
      let value = 127;
      let oldValue = 0;
      let iterations = 0;

      do {
        oldValue = value;
        const pa = this.calculateP(countData, 0, value - 1);
        const pb = this.calculateP(countData, value, 256);

        const uak = this.calculateU(countData, pa, 0, value - 1);
        const ubk = this.calculateU(countData, pb, value, 256);

        value = this.newT(uak, ubk);
        iterations++;
      } while (value != oldValue && iterations <= 20 )

      // set data
      this.binarizeWithThreshold(value);
      this.threshold = value;
    },

    // countPixels(data: Uint8ClampedArray):number[] {
    //
    //   let countData: number[] = new Array(256).fill(0);
    //   // sum data
    //   for (let i = 0; i < data.length; i = i + 4) {
    //     let gray = data[i]; // R
    //     gray += data[i + 1]; // G
    //     gray += data[i + 2]; // B
    //
    //     gray = Math.round(gray / 3);
    //
    //     countData[gray]++;
    //   }
    //
    //   return countData;
    // },
    
    outline(imageData: ImageData):ImageData {
      let data = this.convertImageDataToArrayValue(imageData);

      // Step 1; I erosion H
      let iDashedNot = this.dilation(imageData, this.invertData(data));

      // Step 2: I \cap not(iDashed)
      let result = this.imageCapImageDashed(data, iDashedNot, true);

      return this.convertArrayValueToImageData(result, imageData.width);
    },
    
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
            this.isoData();
            break;
        }
      },
      immediate: true
    },
    hasOutline: {
      handler() {
        this.binarizeWithThreshold(this.threshold)
      }
    }
  }
});
</script>
