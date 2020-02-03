<template>
  <div
    v-html="rendered"
    class="pane rendered-markdown"
  />
</template>

<script>
import marked from 'marked'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    rendered() {
      return marked(this.value)
    }
  }
}
</script>
