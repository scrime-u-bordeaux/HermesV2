<template>
  <div
    :id="id"
    class="slider"
    v-on:touchstart="onPointerDown"
    v-on:touchmove="onPointerMove"
    v-on:touchend="onPointerUp">

    <svg ref="bg" :viewBox="`0 0 ${dims.width} ${dims.height}`">
      <rect
        x="0"
        y="0"
        :width="dims.width"
        :height="dims.height"
        fill="transparent"/>

      <line
        vector-effect="non-scaling-stroke"
        x1="0"
        :y1="dims.radius"
        x2="100"
        :y2="dims.radius"
        stroke-width="2"
        stroke="grey"/>

      <line
        vector-effect="non-scaling-stroke"
        x1="0"
        :y1="dims.radius"
        :x2="cursorPosition"
        :y2="dims.radius"
        stroke-width="2"
        stroke="white"/>

      <!-- see : https://alexwlchan.net/2021/inner-outer-strokes-svg/ -->
      <defs>
        <clipPath id="innerHandle">
          <rect
            :x="cursorPosition - 0.75 * dims.radius"
            :y="dims.radius * 0.5"
            :width="1.5 * dims.radius"
            :height="dims.radius"/>
        </clipPath>
      </defs>
      <rect
        vector-effect="non-scaling-stroke"
        clip-path="url(#innerHandle)"
        :x="cursorPosition - 0.75 * dims.radius"
        :y="dims.radius * 0.5"
        :width="1.5 * dims.radius"
        :height="dims.radius"
        :stroke-width="4"
        stroke="white"
        fill="rgba(0,0,0,0.9)"/>

      <line
        vector-effect="non-scaling-stroke"
        :x1="cursorPosition"
        :y1="dims.radius * 0.8"
        :x2="cursorPosition"
        :y2="dims.radius * 1.2"
        :stroke-width="1"
        stroke="white"/>
    </svg>
  </div>
</template>

<style scoped>
div.slider { display: flex; }
div.slider > svg { pointer-events: none; }
</style>

<script>
export default {
  props: [ 'id', 'thicknessPercent', 'value' ],
  data() {
    return {
      focus: false,
      clientLeft: 0,
      clientWidth: 0,
      pixelRatio: 1,
      position: this.value,
    };
  },
  watch: {
    value(newValue, oldValue) {
      this.position = newValue;
    }
  },
  computed: {
    dims() {
      const radius = this.thicknessPercent / 2;
      const range = 100 - 1.5 * radius;
      return { width: 100, height: this.thicknessPercent, radius, range };
    },
    cursorPosition() {
      return this.position * this.dims.range + 0.75 * this.dims.radius;
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      // cannot get this before the component is mounted :
      const { left, width } = this.$refs['bg'].getBoundingClientRect();
      this.clientLeft = left;
      this.clientWidth = width;
      this.pixelRatio = 100 / width;
    },
    getPositionFromPointerEvent(e) {
      const touchEvent = e.changedTouches[0];
      const realRadius = this.dims.radius / this.pixelRatio;
      return Math.min(Math.max(
        (touchEvent.clientX - this.clientLeft - realRadius) /
        (this.clientWidth - realRadius * 2),
      0), 1);
    },
    onPointerDown(e) {
      this.focus = true;
      this.$refs['bg'].setPointerCapture(e.pointerId);
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