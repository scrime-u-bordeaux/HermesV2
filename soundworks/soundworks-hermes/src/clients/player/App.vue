<template>
  <div id="main">
    <img class="hermes-logo logo"/>
    <tabs class="tabs" :ntabs="4" @change="onTabChange"/>
    <control-interface
      :player="$localStore.currentPlayer"
      :text1="$store.text1"
      :text2="$store.text2"
      :sliderValue="sliderValue"
      :buttonValue="buttonValue"
      :xyValue="xyValue"
      :touchEvent="touchEvent"
      @sliderValueChanged="sliderValueChanged"
      @buttonValueChanged="buttonValueChanged"
      @xyValueChanged="xyValueChanged"/>
  </div>
</template>

<style scoped>
img.logo {
  width: 100%;
  padding-bottom: 10%;
}
</style>

<script>
import Tabs from './components/Tabs.vue';
import ControlInterface from './components/ControlInterface.vue';
import { inject } from 'vue';

export default {
  inject: [ '$store', '$localStore' ],
  components: { Tabs, ControlInterface },
  data() {
    return {
      touchEvent: {
        type: 'none', // could be 'start', 'move' or 'end'
        id: 'none',
        touches: {},
      }
    };
  },
  mounted() {
    const view = document.getElementById('main');
    view.addEventListener("touchstart", this.onTouchStart);
    view.addEventListener("touchend", this.onTouchEnd);
    view.addEventListener("touchcancel", this.onTouchCancel);
    view.addEventListener("touchmove", this.onTouchMove);
  },
  beforeUnmount() {
    const view = document.getElementById('main');
    view.removeEventListener("touchstart", this.onTouchStart);
    view.removeEventListener("touchend", this.onTouchEnd);
    view.removeEventListener("touchcancel", this.onTouchCancel);
    view.removeEventListener("touchmove", this.onTouchMove);
  },
  methods: {
    // ui controls event handlers ----------------------------------------------
    sliderValueChanged(value) {
      const name = `enc${$localStore.currentPlayer}s`;
      this.$store.set(name, value);
    },
    buttonValueChanged(value) {
      const name = `enc${$localStore.currentPlayer}`;
      this.$store.set(name, value);
    },
    xyValueChanged(value) {
      const name = `xy1`;
      this.$store.set(name, value);
    },
    // touch event handlers ----------------------------------------------------
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
    // other stuff -------------------------------------------------------------
    onTabChange(e) {
      this.$localStore.currentPlayer = e;
    },
  }
};
</script>

<script setup>
import { computed, inject } from 'vue';

// const $client = inject('$client');
const $store = inject('$store');
const $localStore = inject('$localStore');

const sliderValue = computed(() => {
  const name = `enc${$localStore.currentPlayer}s`;
  return $store[name];
})

const buttonValue = computed(() => {
  const name = `enc${$localStore.currentPlayer}`;
  return $store[name];
});

const xyValue = computed(() => {
  const name = `xy1`;
  return $store[name];
});
</script>