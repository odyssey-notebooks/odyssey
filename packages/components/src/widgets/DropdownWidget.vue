<template>
  <select
    class="widget dropdown"
    @change="$emit('change', $el.value || null)"
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
  }
}
</script>

<style scoped>
.widget {
  border: 1px solid rgba(0,0,0,0.2);
}
</style>
