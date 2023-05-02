<template>
    <div class="controls">
      <p class="text1"> {{ text1 + " " }} </p>
      <p class="text2"> {{ text2 + " " }} </p>
      <div class="controls-container">
        <cool-slider
          ref="coolSlider"
          thicknessPercent="12"
          :id="'slider'"
          :visible="currentSliderVisible"
          :value="currentSliderValue"
          @change="onSliderValueChanged"/>
        <div class="spacer"></div>
        <cool-button
          ref="coolButton"
          :id="'button'"
          :visible="currentButtonVisible"
          :text="currentButtonLabel"
          :css="currentButtonCss"
          :value="currentButtonValue"
          @change="onButtonValueChanged"/>
        <div class="spacer"></div>
        <x-y-control-surface
          ref="multitouchArea"
          :id="'surface'"
          :heightPercent="50"
          :value="currentXYValue"
          @change="onXYValueChanged"/>
      </div>
    </div>
</template>

<style scoped>
div.controls {
  --spacer: 5%;
}
div.controls > p{
  text-align: center;
}
div.controls > p.text1 {
  min-height: 2em;
  font-size: 2em;
}
div.controls > p.text2 {
  min-height: 1.5em;
  font-size: 1.5em;
}
div.controls {
  width: 100%;
  padding: var(--spacer) 0;
}
div.spacer {
  margin-top: var(--spacer);
}
</style>

<script>
import CoolSlider from './CoolSlider.vue';
import CoolButton from './CoolButton.vue';
import MultitouchArea from './MultitouchArea.vue';
import XYControlSurface from './XYControlSurface.vue';

export default {
  inject: [ '$client', '$store', '$localStore' ],
  props: [
    'player',
    'text1',
    'text2',
    'touchEvent',
    'sliderValue',
    'buttonValue',
    'xyPosition',
  ],
  components: { CoolSlider, CoolButton, XYControlSurface },
  data() {
    return {
    };
  },
  computed: {
    currentButtonValue() {
      return this.$store[`enc${this.player}`];
    },
    currentButtonLabel() {
      return this.$store[`enc${this.player}Label`];
    },
    currentButtonCss() {
      return this.$store[`enc${this.player}Css`];
    },
    currentButtonVisible() {
      return this.$store[`enc${this.player}Visible`];
    },
    currentSliderValue() {
      return this.$store[`enc${this.player}s`];
    },
    currentSliderVisible() {
      return this.$store[`enc${this.player}sVisible`];
    },
    currentXYValue() {
      const [ x, y ] = this.$store[`xy1`];
      return { x, y };
    },
  },
  mounted() {
    const { pitches, buttons } = this.$client.stateManager.client.global.getValues();
    this.pitches = pitches;
    this.buttons = buttons;
  },
  methods: {
    onSliderValueChanged(v) {
      this.$store.set(`enc${this.player}s`, v);
    },
    onButtonValueChanged(v) {
      this.$store.set(`enc${this.player}`, v);
    },
    onXYValueChanged(v) {
      this.$store.set(`xy1`, [ v.x, v.y ]);
    },
  },
};
</script>

<!--
<script setup>
import { ref } from 'vue';

const coolButton = ref(null);
const coolSlider = ref(null);
const blink = () => { coolButton.blink(); }
// return { coolButton };
</script>
-->