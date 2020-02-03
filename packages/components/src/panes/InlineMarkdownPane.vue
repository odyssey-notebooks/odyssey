<template>
  <div
    v-html="rendered"
    class="pane inline-markdown"
  />
</template>

<script>
import renderInlineMarkdown from '../helpers/inlineMarkdown.js'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    rendered() {
      return inlineMarkdown(this.value)
    }
  }
}
</script>
