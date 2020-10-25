import Vue from "vue";

export default Vue.extend({
  methods: {
    calculateP(data: number[], min: number, max: number): number {
      let sum = 0;

      for (let i = min; i < max; i++) {
        sum += data[i];
      }

      return sum;
    },

    calculateU(data: number[], p: number, min: number, max: number): number {
      const reciprocalP = 1 / p;

      let sum = 0;

      for (let i = min; i < max; i++) {
        sum += i * data[i];
      }

      return reciprocalP * sum;
    },

    newT(uak: number, ubk: number): number {
      return Math.round((uak + ubk) / 2);
    }
  }
});
