<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="i in nplayers"
      v-bind:class="selected === i ? 'selected' : ''"
      @pointerdown="onClick(i)"
    >
      Joueur {{i}}
    </div>
  </div>
</template>

<style scoped>
div.tabs {
  display: flex;
  width: 100%;
}
div.tab {
  flex: 1 1 auto;
  margin: 1px;
  padding: 1em 0.5em;
  text-align: center;
  cursor: pointer;
  border: 1px solid white;
  color: white;
  background-color: black;
}

div.tab.selected {
  color: black;
  background-color: white;
}
</style>

<script>
export default {
  props: [ 'nplayers' ],
  data() {
    return {
      selected: 1,
    };
  },
  methods: {
    onClick(index) {
      // console.log(`clicked on tab ${index}`);
      this.selected = index;
      this.$emit('change', this.selected);
    }
  }
};
</script>