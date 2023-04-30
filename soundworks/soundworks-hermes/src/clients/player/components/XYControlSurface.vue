<template>
<div
  :id="id"
  class="surface"
  ref="surface"
  v-on:touchstart="onPointerDown"
  v-on:touchmove="onPointerMove"
  v-on:touchend="onPointerUp">

  <svg ref="vector" :viewBox="`0 0 ${dims.width} ${dims.height}`">
    <rect
      vector-effect="non-scaling-stroke"
      x="0"
      y="0"
      :width="dims.width"
      :height="dims.height"
      stroke="white"
      stroke-width="2"
      fill="black"/>
    <circle
      vector-effect="non-scaling-stroke"
      :cx="cursorPosition.x"
      :cy="cursorPosition.y"
      :r="dims.radius * pixelRatio"
      stroke="white"
      stroke-width="1"
      fill="rgba(255,255,255,0.33)"/>
  </svg>

</div>
</template>

<style scoped>
svg { pointer-events: none; }
</style>

<script>
export default {
  props: [ 'id', 'heightPercent', 'value' ],
  data() {
    return {
      clientLeft: 0,
      clientTop: 0,
      clientWidth: 0,
      clientHeight: 0,
      pixelRatio: 1,
      position: { x: 0, y: 0 },
    };
  },
  watch: {
    value(newValue, oldValue) {
      this.position = newValue;
    }
  },
  computed: {
    dims() {
      return {
        width: 100,
        height: this.heightPercent,
        radius: 10,
      };
    },
    cursorPosition() {
      const r = this.dims.radius * this.pixelRatio;
      return {
        x: this.position.x * (this.dims.width - 2 * r) + r,
        y: this.position.y * (this.dims.height - 2 * r) + r,
        // x: this.position.x * this.dims.width,
        // y: this.position.y * this.dims.height,
      };
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeUpdate() {
    this.onResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      const {
        x, y, width, height,
      } = this.$refs['vector'].getBoundingClientRect();

      this.clientLeft = x;
      this.clientTop = y;
      this.clientWidth = width;
      this.clientHeight = height;
      this.pixelRatio = 100 / width;
      // console.log(this.$refs['vector'].getBoundingClientRect());
      // console.log('surface x y w h :');
      // console.log(x, y, width, height);
    },
    getPositionFromPointerEvent(e) {
      const touchEvent = e.changedTouches[0];
      
      const r = this.dims.radius;// * this.pixelRatio;
      const x = Math.min(Math.max(
        (touchEvent.clientX - this.clientLeft - r) /
        (this.clientWidth - r * 2),
      0), 1);
      const y = Math.min(Math.max(
        (touchEvent.clientY - this.clientTop - r) /
        (this.clientHeight - r * 2),
      0), 1);
      // const x = Math.min(Math.max(
      //   (touchEvent.clientX - this.clientLeft) / this.clientWidth,
      // 0), 1);
      // const y = Math.min(Math.max(
      //   (touchEvent.clientY - this.clientTop) / this.clientHeight,
      // 0), 1);

      return { x, y };
    },
    onPointerDown(e) {
      this.onResize();
      this.focus = true;
      this.$refs['vector'].setPointerCapture(e.pointerId);
      this.position = this.getPositionFromPointerEvent(e);
      this.$emit('change', this.position);
    },
    onPointerMove(e) {
      if (this.focus) {
        this.position = this.getPositionFromPointerEvent(e);
        this.$emit('change', this.position);
      }
    },
    onPointerUp(e) {
      this.focus = false;
    },
  },
};
</script>