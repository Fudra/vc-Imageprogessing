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
        <span class="text-gray-600 text-right">({{threshold}})</span>

      </label
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
      outline: false
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
      const data =  new Uint8ClampedArray(this.image.imageData.data)

      // calculate argb to grayscale
      for (let i = 0; i < data.length; i = i + 4) {
        let gray = data[i]; // R
        gray += data[i + 1]; // G
        gray += data[i + 2]; // B
        // gray += data[i + 3]; // A

        gray = Math.round(gray / 3);
        const value =  gray > threshold ? 255 : 0;

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
    },
    isoData() {
      const data = new Uint8ClampedArray(this.image.imageData.data);

      let countData:number[] = new Array(256).fill(0);
      let dataMax = [];

      // isodata
      let value = 127;
      let oldValue = 0;

      // sum data
      for (let i = 0; i < data.length; i = i + 4) {
        let gray = data[i]; // R
        gray += data[i + 1]; // G
        gray += data[i + 2]; // B
        // gray += data[i + 3]; // A

        gray = Math.round(gray / 3);

        countData[gray]++;
      }


      do {
        oldValue = value;
        const pa = this.calculateP(countData, 0, value - 1);
        const pb = this.calculateP(countData, value, 256);

        const uak = this.calculateU(countData, pa, 0, value - 1);
        const ubk = this.calculateU(countData, pb, value, 256);

        value = this.newT(uak, ubk);
        console.log("round");
      } while (value != oldValue)

      // set data
      this.binarizeWithThreshold(value);
      this.threshold = value;
    },

    // helper iso data
    calculateP(data:number[], min: number, max:number) {
      let sum = 0;

      for (let i = min; i < max; i++) {
        sum  += data[i];
      }

      return sum;
    },
    calculateU(data:number[], p: number, min: number, max:number) {
      const reciprocalP = 1/p;

      let sum = 0;

      for (let i = min; i < max; i++) {
        sum  += i * data[i];
      }

      return reciprocalP * sum;
    },
    newT(uak: number, ubk: number) {
      return Math.round((uak + ubk) / 2);
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
            this.isoData();
            break;
        }
      },
      immediate: true
    }
  }
});
</script>
