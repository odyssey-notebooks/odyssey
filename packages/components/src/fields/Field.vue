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
.label-wrapper {
  width: 150px;
  height: 100%;
  padding-bottom: 0.75rem;
}
.field .widget-wrapper {
  width: 100%;
  height: 100%;
}
.field .widget-wrapper.full-width {
  width: 100%;
}
label {
  font-size: 1.25rem;
  font-family: sans-serif;
}
.description {
  padding: 0 2rem 1rem 0;
}
</style>