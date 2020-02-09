<template>
  <input
    type="checkbox"
    class="widget dropdown"
    @change="onChange"
    :checked.prop="value"
  />
</template>

<script>
import renderInlineMarkdown from '../helpers/inlineMarkdown.js'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', this.$el.checked)
    }
  }
}
</script>

<style scoped>
.widget {
  border: 1px solid rgba(0,0,0,0.2);
}
</style>
