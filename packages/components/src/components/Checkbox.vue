<template>
  <input type="checkbox" name="foo" :checked="internalValue" @input="onInput">
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      internalValue: this.value
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', this._value)
    }
  }
}
</script>
