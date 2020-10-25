<template>
  <div class="flex flex-col">
    <p class="px-4 py-2 text-sm text-gray-700 uppercase font-semibold">
      {{ caption }}
    </p>
    <canvas :width="size.width" :height="size.height" ref="imageCanvas" />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue, { PropType } from "vue";
import { ImageTypes, ModifiedImage } from "@/interfaces";

interface VCCanvasData {
  ctx: CanvasRenderingContext2D | null;
  size: {
    width: number;
    height: number;
  };
}

export default Vue.extend({
  name: "VCCanvasOriginal",
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
    },
    image: {
      type: String,
      required: true
    },
  },
  methods: {
    async loadAndScaleImage(image: string) {
      if (this.ctx == null) return;

      const imageElement = new Image();
      imageElement.src = image;

      await this.$nextTick();

      const w = (this.$refs.imageCanvas as HTMLCanvasElement).width;
      const nw = (imageElement as HTMLImageElement).naturalWidth;
      const nh = (imageElement as HTMLImageElement).naturalHeight;
      const aspect = nw / nh;
      (this.$refs.imageCanvas as HTMLCanvasElement).height = w / aspect;

      this.ctx.drawImage(
          imageElement,
          0,
          0,
          this.size.width,
          this.size.height / aspect
      );

      this.getImageData();
    },
    getImageData() {
      if (this.ctx == null) return;
      const canvas = this.$refs.imageCanvas as HTMLCanvasElement;

      if (canvas.height === 0) return;

      const imageData = this.ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
      );

      this.$emit("imageData", {
        imageData: imageData,
        type: this.imgDataType
      });
    }
  },
  watch: {
    image: {
      handler(image: string | null) {
        if (image == null) return;
        this.loadAndScaleImage(image);
      },
    },
  },
  async mounted() {
    this.ctx = (this.$refs.imageCanvas as HTMLCanvasElement).getContext("2d");

    await this.$nextTick();
    if(this.ctx === null) return;
    this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    await this.loadAndScaleImage(this.image);
  }
});
</script>
