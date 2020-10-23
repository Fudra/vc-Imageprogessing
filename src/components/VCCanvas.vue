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
    getImage(): HTMLImageElement | null {
      return this.$store.getters[`image/${this.imgDataType}`];
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
    }
  },
  watch: {
    getImage: {
      handler(imageData: CanvasImageSource) {
        this.loadAndScaleImage(imageData);
      }
    }
  },
  mounted() {
    this.ctx = (this.$refs.imageCanvas as HTMLCanvasElement).getContext("2d");
  }
});
</script>
