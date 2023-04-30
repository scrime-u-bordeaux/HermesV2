<template>
<div
  :id="id"
  class="surface"
  ref="surface">
  <svg ref="vector" :viewBox="`0 0 ${dims.width} ${dims.height}`">
    <rect x="0" y="0" :width="dims.width" :height="dims.height" fill="rgba(255,255,255,0.33)"/>
    <template v-for="n in polyphony">
      <circle
        :cx="points[n-1].x"
        :cy="points[n-1].y"
        r="2"
        stroke="black"
        stroke-width="0.1"
        :fill="colors[(n - 1)%colors.length]"/>
    </template>
  </svg>
</div>
</template>

<style scoped>
svg { pointer-events: none; }
</style>

<script>
export default {
  inject: [ '$localStore' ],
  props: [ 'id', 'heightPercent', 'polyphony' ],
  data() {
    return {
      colors: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
      ],
      points: new Array(this.polyphony).fill({x:0.5,y:0.5}, 0, this.polyphony),
    };
  },
  computed: {
    dims() {
      return { width: 100, height: this.heightPercent };
    },
  },
  mounted() {
    for (let i = 0; i < this.polyphony; ++i) {
      this.points[i] = {
        x: Math.random() * this.dims.width,
        y: Math.random() * this.dims.height,
      };
    }
  },
  methods: {
    polToCar(a, d) {
      // return { x, y };
    }
  }
};
</script>