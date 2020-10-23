<template>
  <div class="flex flex-col">
    <canvas
        :width="size.width"
        :height="size.height"
        ref="imageCanvas" />
    <p class="px-4 py-2 text-sm text-gray-700 uppercase">{{ caption }}</p>
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
        width: 400,
        height: 400
      }
    } as VCCanvasData;
  },
  props: {
    caption: {
      type: String,
      required: true
    },
    imgDataType: {
      type: Object as PropType<ImageTypes>,
      default: ImageTypes.ORIGINAL
    }
  },
  computed: {
    getImage(): HTMLImageElement | null {
      return this.$store.getters[`image/${this.imgDataType}`];
    }
  },
  watch: {
    getImage: {
      handler(imageData) {
        if (this.ctx == null) return;
        this.ctx.drawImage(imageData, 0, 0, this.size.width, this.size.height)
      }
    }
  },
  mounted() {
    this.ctx = (this.$refs.imageCanvas as HTMLCanvasElement).getContext("2d");
  }
});
</script>
