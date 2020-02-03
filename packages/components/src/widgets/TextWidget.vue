<template>
  <input
    type="text"
    class="widget text"
    @keydown.esc="() => $el.blur()"
    @input="() => $emit('input', $el.value)"
    @change="() => $emit('change', $el.value)"
    :value="value"
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
  methods: {
    handleKeydown(e) {
      if (e.key === ['Escape', 'Enter'].includes(e.key)) {
        this.$el.blur()
      }
    }
  }
}
</script>

<style scoped>
.widget {
  border: 1px solid rgba(0,0,0,0.2);
}
</style>
