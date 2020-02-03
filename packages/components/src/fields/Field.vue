<template>
  <div class="field">
    <div class="label-wrapper" v-if="label">
      <label v-text="label" :for="label"/>
      <markdown-pane class="description" v-if="description" :value="description"/>
    </div>
    <div class="widget-wrapper" :class="!label && 'full-width'">
      <slot/>
    </div>
  </div>
</template>

<script>
import MarkdownPane from '../panes/MarkdownPane.vue'

export default {
  components: {
    MarkdownPane
  },
  props: {
    label: {
      type: String
    },
    description: {
      type: String
    }
  }
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.label-wrapper {
  width: 25%;
  height: 100%;
}
.field .widget-wrapper {
  width: 75%;
  height: 100%;
}
.field .widget-wrapper.full-width {
  width: 100%;
}
label {
  font-size: 1.5rem;
  font-family: sans-serif;
}
.description {
  padding: 0 2rem 1rem 0;
}
</style>