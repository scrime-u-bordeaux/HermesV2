<template>
  <div id="main">
    <ensemble-display
      :nplayers="4"
      :height="'20px'"/>
    <tabs
      :nplayers="4"
      @change="onTabChange"/>
    <control-interface
      :player="$localStore.currentPlayer"
      :imageVisible="$store.image1Visible"
      :panelStyle="$store.panel1Css"
      :panelVisible="$store.panel1Visible"
      :text1="$store.text1"
      :text2="$store.text2"
      :sliderValue="sliderValue"
      :sliderVisible="sliderVisible"
      :buttonValue="buttonValue"
      :buttonText="buttonText"
      :buttonStyle="buttonStyle"
      :buttonVisible="buttonVisible"
      :xyValue="xyValue"
      :xyInteraction="$store.xy1Interaction"
      :xyLeft="$store.xy1Left"
      :xyVisible="$store.xy1Visible"
      :touchEvent="touchEvent"
      @sliderValueChanged="sliderValueChanged"
      @buttonValueChanged="buttonValueChanged"
      @xyValueChanged="xyValueChanged"/>
  </div>
</template>

<style scoped>
</style>

<script>
import { inject } from 'vue';
import EnsembleDisplay from './components/EnsembleDisplay.vue';
import Tabs from './components/Tabs.vue';
import ControlInterface from './components/ControlInterface.vue';

export default {
  inject: [ '$store', '$localStore' ],
  components: { EnsembleDisplay, Tabs, ControlInterface },
  data() {
    return {
      touchEvent: {
        type: 'none', // could be 'start', 'move' or 'end'
        id: 'none',
        touches: {},
      }
    };
  },
  // mounted() {
  //   const view = document.getElementById('main');
  //   view.addEventListener("touchstart", this.onTouchStart);
  //   view.addEventListener("touchend", this.onTouchEnd);
  //   view.addEventListener("touchcancel", this.onTouchCancel);
  //   view.addEventListener("touchmove", this.onTouchMove);
  // },
  // beforeUnmount() {
  //   const view = document.getElementById('main');
  //   view.removeEventListener("touchstart", this.onTouchStart);
  //   view.removeEventListener("touchend", this.onTouchEnd);
  //   view.removeEventListener("touchcancel", this.onTouchCancel);
  //   view.removeEventListener("touchmove", this.onTouchMove);
  // },
  methods: {
    // ui controls event handlers ----------------------------------------------
    sliderValueChanged(value) {
      const name = `enc${this.$localStore.currentPlayer}s`;
      this.$store.set(name, value);
    },
    buttonValueChanged(value) {
      const name = `enc${this.$localStore.currentPlayer}`;
      this.$store.set(name, value);
    },
    xyValueChanged(value) {
      const { x, y } = value;
      this.$store.set('xy1', [ x, y ]);
    },
    // other stuff -------------------------------------------------------------
    onTabChange(e) {
      this.$localStore.currentPlayer = e;
    },
    // touch event handlers ----------------------------------------------------
    /*
    onTouchStart(e) {
      e.preventDefault();
      const type = 'start';
      const id = e.target.id;
      const touches = e.changedTouches;
      this.touchEvent = { type, id, touches };
    },
    onTouchEnd(e) {
      e.preventDefault();
      const type = 'end';
      const id = e.target.id;
      const touches = e.changedTouches;
      this.touchEvent = { type, id, touches };
    },
    onTouchCancel(e) {
      e.preventDefault();
      const touches = e.changedTouches;
    },
    onTouchMove(e) {
      e.preventDefault();
      const type = 'move';
      const id = e.target.id;
      const touches = e.changedTouches;
      this.touchEvent = { type, id, touches };
    },
    //*/
  }
};
</script>

<script setup>
import { computed, inject } from 'vue';

const $store = inject('$store');
const $localStore = inject('$localStore');

// slider ----------------------------------------------------------------------

const sliderValue = computed(() => {
  const name = `enc${$localStore.currentPlayer}s`;
  return $store[name];
})

const sliderVisible = computed(() => {
  const name = `enc${$localStore.currentPlayer}sVisible`;
  return $store[name];
});

// button ----------------------------------------------------------------------

const buttonValue = computed(() => {
  const name = `enc${$localStore.currentPlayer}`;
  return $store[name];
});

const buttonText = computed(() => {
  const name = `enc${$localStore.currentPlayer}Label`;
  return $store[name];
});

const buttonStyle = computed(() => {
  const name = `enc${$localStore.currentPlayer}Css`;
  return $store[name];
});

const buttonVisible = computed(() => {
  const name = `enc${$localStore.currentPlayer}Visible`;
  return $store[name];
});

// xy control surface ----------------------------------------------------------

const xyValue = computed(() => {
  const [ x, y ] = $store['xy1'];
  return { x, y };
});

// const xyInteraction = computed(() => $store['xy1Interaction']);
// const xyLeft        = computed(() => $store['xy1Left']);
// const xyVisible     = computed(() => $store['xy1Visible']);

</script>