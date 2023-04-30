<template>
  <div
    ref="button"
    class="button"
    :id="id"
    v-on:touchstart="onPointerDown"
    v-on:touchend="onPointerUp"
    :class="{ 'button-blink': blinking }">
    
    <div
      class="button-content"
      :class="{ 'button-on': on }">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
div.button {
  border: 1px solid white;
  background-color: black;
}
div.button-content {
  text-align: center;
  padding: 2em 0.5em;
  pointer-events: none;
  transition: background-color 0.2s;
  background-color: transparent;
}
div.button-on {
  transition: background-color 0.2s;
  background-color: rgba(255,255,255,0.5);
}
</style>

<script>
export default {
  props: [ 'id', 'class', 'text', 'value' ],
  data() {
    return {
      on: false,
      blinking: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue) {
        this.blink();
      } 
      this.on = newValue;
    }
  },
  methods: {
    blink() {
      // magical solution found here : https://stackoverflow.com/a/45036752
      setTimeout(() => {
        const b = this.$refs['button'];
        b.style.animation = 'none';
        b.offsetHeight; // trigger reflow
        b.style.animation = '';
        this.blinking = true;
      }, 10);
    },
    onPointerDown(e) {
      // console.log('pressed button');
      this.$emit('trigger');
      this.$emit('change', true);
      this.blink();
      this.on = true;
    },
    onPointerUp(e) {
      // console.log('released button');
      this.$emit('change', false);
      this.on = false;
    },
  },
};
</script>

<script setup>
import { ref } from 'vue';

const button = ref(null);
const blink = () => {
  // magical solution found here : https://stackoverflow.com/a/45036752
  setTimeout(() => {
    const b = button.value;
    b.style.animation = 'none';
    b.offsetHeight; // trigger reflow
    b.style.animation = '';
    b.classList.add('button-blink');
  }, 10);
};

defineExpose({ blink });
</script>

