<template>
  <div class="flex flex-col">
    <canvas :width="size.width" :height="size.height" ref="imageCanvas" />
    <p class="px-4 py-2 text-sm text-gray-700 uppercase font-semibold">
      {{ caption }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ImageTypes } from "@/interfaces";

interface VCCanvasData {
  ctx: CanvasRenderingContext2D | null;
  size: {
    width: number;
    height: number;
  };
}

export default Vue.extend({
  name: "VCCanvas",
  data() {
    return {
      ctx: null,
      size: {
        width: 600,
        height: 600
      }
    } as VCCanvasData;
  },
  props: {
    caption: {
      type: String,
      required: true
    },
    imgDataType: {
      type: String as PropType<ImageTypes>,
      default: ImageTypes.ORIGINAL
    }
  },
  computed: {
    image(): HTMLImageElement | null {
      return this.$store.getters[`image/${this.imgDataType}`];
    },
    imageData(): ImageData | null {
      return this.$store.getters[`image/${this.imgDataType}Data`];
    },
    lastChangedModified() {
      return this.$store.getters[`image/lastChangedModified`];
    }
  },
  methods: {
    loadAndScaleImage(imageData: CanvasImageSource) {
      if (this.ctx == null) return;

      const w = (this.$refs.imageCanvas as HTMLCanvasElement).width;
      const nw = (imageData as HTMLImageElement).naturalWidth;
      const nh = (imageData as HTMLImageElement).naturalHeight;
      const aspect = nw / nh;
      (this.$refs.imageCanvas as HTMLCanvasElement).height = w / aspect;

      this.ctx.drawImage(
        imageData,
        0,
        0,
        this.size.width,
        this.size.height / aspect
      );

      this.getImageData();
    },
    async getImageData() {
      if (this.ctx == null) return;
      const canvas = this.$refs.imageCanvas as HTMLCanvasElement;
      const imageData = this.ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      await this.$store.dispatch("image/setImageData", {
        imageData,
        type: this.imgDataType
      });
    }
  },
  watch: {
    image: {
      handler(image: CanvasImageSource) {
        this.loadAndScaleImage(image);
      }
    },
    imageData: {
      handler(imageData: ImageData) {
        if (this.ctx == null) return;
        this.ctx.putImageData(imageData, 0, 0);
      }
    },
    lastChangedModified: {
      handler() {
        if (this.ctx == null || this.imageData == null) return;
        if (this.imgDataType == ImageTypes.ORIGINAL) return;
        console.log("lastChangedModified");
        this.ctx.putImageData(this.imageData, 0, 0);
      }
    }
  },
  mounted() {
    this.ctx = (this.$refs.imageCanvas as HTMLCanvasElement).getContext("2d");
  }
});
</script>
