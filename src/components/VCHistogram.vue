<template>
  <div>
    <h3 class="text-sm uppercase leading-relaxed text-gray-700 font-semibold">
      histogram
    </h3>
    <div class="w-full">
      <canvas
        :width="size.width"
        :height="size.height"
        ref="histogram"
      ></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface VCHistogramData {
  ctx: CanvasRenderingContext2D | null;
  size: {
    width: number;
    height: number;
  };
  histogramHeight: number;
  histogramBarWidth: number;
}

export default Vue.extend({
  name: "VCHistogram",
  data() {
    return {
      ctx: null,
      size: {
        width: 256,
        height: 250
      },
      histogramHeight: 250,
      histogramBarWidth: 1
    } as VCHistogramData;
  },
  props: {
    imageData: {
      type: Array,
      required: true
    }
  },
  methods: {
    drawHistogram() {
      if (this.ctx === null) return;

      this.ctx.clearRect(0, 0, this.size.width, this.size.height);

      const max = Math.max(...(this.imageData as any));

      const histogramData = (this.imageData as any).map(
        (value: number) => (value / max/ 2) * this.histogramHeight
      );

      for (let i = 0; i < this.imageData.length; i++) {
        this.ctx.fillRect(
          i * this.histogramBarWidth,
          this.histogramHeight - histogramData[i],
          this.histogramBarWidth,
          histogramData[i]
        );
      }
    }
  },
  watch: {
    imageData: {
      handler() {
        this.drawHistogram();
      }
    }
  },
  mounted() {
    this.ctx = (this.$refs.histogram as HTMLCanvasElement).getContext("2d");
    this.drawHistogram();
  }
});
</script>
