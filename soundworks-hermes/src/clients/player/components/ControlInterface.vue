<template>
    <div class="controls">
      <p class="text1"> {{ text1 + " " }} </p>
      <p class="text2"> {{ text2 + " " }} </p>
      <div class="controls-container">        
        <div class="controls-block" :class="{ disabled: !xyVisible }">
          <x-y-control-surface
            ref="multitouchArea"
            :id="'surface'"
            :heightPercent="100"
            :value="xyValue"
            @change="onXYValueChanged"/>
        </div>

        <div
          class="controls-block"
          :style="panelStyle"
          :class="{ disabled: !panelVisible || (!sliderVisible && !buttonVisible) }">
          <cool-slider
            ref="coolSlider"
            thicknessPercent="20"
            :id="'slider'"
            :value="sliderValue"
            :class="{ disabled: !sliderVisible }"
            @change="onSliderValueChanged"/>
          <div class="spacer"></div>
          <cool-button
            ref="coolButton"
            :id="'button'"
            :value="buttonValue"
            :text="buttonText"
            :style="buttonStyle"
            :class="{ disabled: !buttonVisible }"
            @change="onButtonValueChanged"/>
        </div>

        <div
          id="logo-container"
          class="controls-block"
          :class="{ disabled: !imageVisible }">
          <img class="hermes-logo logo"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
div.controls {
  --spacer: 2.5em;
}
div.controls {
  position: relative;
  width: 100%;
  /* padding: var(--spacer) 0; */
}
div.controls > p {
  text-align: center;
}
div.controls > p.text1 {
  min-height: 1.6em;
  font-size: 1.6em;
  margin: 2em 0;
}
div.controls > p.text2 {
  min-height: 1.3em;
  font-size: 1.3em;
  margin: 0;
  margin-bottom: 2em;
}
div.controls-container {
  position: absolute;
  width: 100%;
  height: 90vw;
}
div.controls-block {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: start;
  padding: 1.3em;
}
div#logo-container {
  pointer-events: none;
}
img.logo {
  width: 90%;
  padding-bottom: 10%;
  margin: 0 auto;
}
.disabled {
  visibility: hidden !important;
  pointer-events: none;
}
div.spacer {
  margin-top: var(--spacer);
}
</style>

<script>
import CoolSlider from './CoolSlider.vue';
import CoolButton from './CoolButton.vue';
import XYControlSurface from './XYControlSurface.vue';

export default {
  inject: [ '$client', '$store', '$localStore' ],
  props: [
    'player',
    'imageVisible',
    'panelStyle',
    'panelVisible',
    'text1',
    'text2',
    'sliderValue',
    'sliderVisible',
    'buttonValue',
    'buttonText',
    'buttonStyle',
    'buttonVisible',
    'xyValue',
    'xyInteraction',
    'xyLeft',
    'xyVisible',
    'touchEvent',
  ],
  components: { CoolSlider, CoolButton, XYControlSurface },
  methods: {
    onSliderValueChanged(v) {
      // this.$store.set(`enc${this.player}s`, v);
      this.$emit('sliderValueChanged', v);
    },
    onButtonValueChanged(v) {
      // this.$store.set(`enc${this.player}`, v);
      this.$emit('buttonValueChanged', v);
    },
    onXYValueChanged(v) {
      // this.$store.set(`xy1`, [ v.x, v.y ]);
      this.$emit('xyValueChanged', v);
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
</script>
-->