<template>
<div
  class="ensemble"
  :style="{ height: `${height}` }"
  ref="ensemble">

  <div
    class="player"
    v-for="i in nplayers">
    <svg
      width="100%"
      :height="height"
      viewBox="0 0 100 100"
      preserveAspectRatio="none">
      <rect
        :id="`blinking-sliton-${i}`"
        :ref="`blinking-sliton-${i}`"
        class="blinking-rect"
        vector-effect="non-scaling-stroke"
        x="-2"
        y="-2"
        :width="$store[`enc${i}s`] * 104"
        height="100"
        stroke="white"
        stroke-width="1"
        :class="{ 'sliton-blink': blinking[i - 1].blink }"/>
      <rect
        class="sliton-onoff"
        vector-effect="non-scaling-stroke"
        x="-2"
        y="-2"
        :width="$store[`enc${i}s`] * 102"
        height="100"
        :class="{ 'sliton-on': on[i - 1].on }"/>
    </svg>
  </div>

</div>
</template>

<style scoped>
div.ensemble {
  display: flex;
  width: 100%;
  pointer-events: none;
}
div.player {
  flex: 1 0 auto;
  margin: 1px;
  padding: 0;
  text-align: center;
  border: 1px solid white;
  color: white;
  background-color: black;
  overflow: hidden;
}
rect.sliton-onoff {
  text-align: center;
  padding: 2em 0.5em;
  transition: fill 0.2s;
  fill: transparent;
}
rect.sliton-on {
  transition: fill 0.2s;
  fill: rgba(255,255,255,0.5);
}
</style>

<script>
export default {
    inject: [ '$store' ],
    props: [ 'nplayers', 'height' ],
    data() {
      return {
        blinking: Array(this.nplayers).fill({ blink: false }),
      };
    },
    computed: {
      on() {
        const res = [];
        for (let i = 1; i <= this.nplayers; ++i) {
          const state = { on: this.$store[`enc${i}`] };
          res.push(state);
          if (state.on) this.blink(i);
        }
        return res;
      }
    },
    methods: {
      blink(i) {
      // magical solution found here : https://stackoverflow.com/a/45036752
      this.blinking[i - 1] = { blink: false };
      setTimeout(() => {
        const sliton = this.$refs[`blinking-sliton-${i}`];
        sliton.animation = 'none';
        sliton.offsetHeight; // trigger reflow
        sliton.animation = '';
        this.blinking[i - 1] = { blink: true };
      }, 10);
    },
  },
};
</script>
