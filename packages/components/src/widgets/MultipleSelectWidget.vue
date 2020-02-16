<template>
  <select
    multiple 
    class="widget multiple-select"
    @input="e => $emit('input', Array.from(e.target.selectedOptions).map(opt => opt.value))"
    @change="e => $emit('change', Array.from(e.target.selectedOptions).map(opt => opt.value))"
  >
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
      :selected.prop="value.includes(option.value)"
      v-html="option.label"
    />
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
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