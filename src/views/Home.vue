<template>
  <div class="flex">
    <div class="w-3/4 h-full flex flex-col">
      <h1
        class="w-full text-gray-700 font-semibold text-2xl px-4 py-2 bg-gray-200"
      >
        Image Processing
      </h1>

      <div class="flex ">
        <div class="w-1/2 p-4">
          <VCCanvasOriginal
            caption="original"
            :image="image"
            @imageData="emittedImageData"
          />
        </div>

        <div class="w-1/2 p-4">
          <VCCanvasModified caption="modified" :image-data="imageDataChanged" />
        </div>
      </div>
    </div>

    <div class="w-1/4 bg-gray-200 h-screen p-4 space-y-8">
      <VCHistogram :image-data="grayColorCount" class="w-full" />
      <VCBinarizePlane
        v-if="imageData"
        :image="imageData"
        :gray-color-count="grayColorCount"
        @imageChange="imageDataChanging"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VCCanvasModified from "@/components/VCCanvasModified.vue";
import VCCanvasOriginal from "@/components/VCCanvasOriginal.vue";
import VCBinarizePlane from "@/components/VCBinarizePlane.vue";
import VCHistogram from "@/components/VCHistogram.vue";
import { ImageTypes, ModifiedImage } from "@/interfaces.ts";
import testimage from "@/testimage";

interface ViewHomeData {
  ImageTypes: typeof ImageTypes;
  image: null | string;
  grayColorCount: Array<number>;
  imageData: ModifiedImage | null;
  imageDataChanged: ModifiedImage | null;
}

export default Vue.extend({
  name: "ViewHome",
  data() {
    return {
      ImageTypes,
      image: testimage,
      imageData: null,
      imageDataChanged: null,
      grayColorCount: []
    } as ViewHomeData;
  },
  components: {
    VCCanvasOriginal,
    VCCanvasModified,
    VCBinarizePlane,
    VCHistogram
  },
  created() {
    window.ipcRenderer.on("imageFileSelected", async (event, args) => {
      this.image = args.contents;
    });
  },
  methods: {
    emittedImageData(data: ModifiedImage) {
      this.imageData = {
        imageData: data.imageData,
        type: ImageTypes.ORIGINAL,
        changed: data.changed
      };

      this.grayColorCount = this.countPixels(data.imageData.data);
    },
    imageDataChanging(data: ModifiedImage) {
      this.imageDataChanged = data;
    },
    countPixels(data: Uint8ClampedArray): number[] {
      const countData: number[] = new Array(256).fill(0);
      // sum data
      for (let i = 0; i < data.length; i = i + 4) {
        let gray = data[i]; // R
        gray += data[i + 1]; // G
        gray += data[i + 2]; // B

        gray = Math.round(gray / 3);

        countData[gray]++;
      }

      return countData;
    }
  }
});
</script>
