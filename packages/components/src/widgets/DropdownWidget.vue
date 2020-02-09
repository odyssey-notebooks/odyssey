<template>
  <select
    class="widget dropdown"
    @change="onChange"
    :value="value"
  >
    <option
      :selected="[null, undefined].includes(value)"
      value=""
      v-text="'-'"
    />
    <option
      v-for="(option, i) in options"
      :key="i"
      :selected="option.id === value"
      :value="option.id"
      v-text="option.text"
    />
  </select>
</template>

<script>
import renderInlineMarkdown from '../helpers/inlineMarkdown.js'

export default {
  props: {
    value: {
      type: String
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    onChange(e) {
      console.log('change emitted')
      this.$emit('change', this.$el.value || null)
    }
  }
}
</script>

<style scoped>
.widget {
  border: 1px solid rgba(0,0,0,0.2);
}
</style>
