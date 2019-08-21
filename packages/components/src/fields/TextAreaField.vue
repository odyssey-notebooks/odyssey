<template>
  <div
    :contenteditable="editable"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
    :style="whitespace"
    v-html="processedText"
  />
</template>

<script>
import marked from 'marked'
import handleHtml from '../helpers/handleHtml.js'

export default {
  props: {
    h: {
      type: Number,
      default: 2
    },
    text: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    editing: false
  }),
  computed: {
    whitespace() {
      return this.editing 
        ? 'white-space: pre;'
        : ''
    },
    processedText() {
      // When not editing, render markdown
      return !this.editing
        ? marked(this.text)
        : this.text
    }
  },
  methods: {
    handleKeydown(e) {
      const forbiddenEdit = e.ctrlKey && ['u', 'b', 'i'].includes(e.key)
      if (forbiddenEdit) {
        e.preventDefault()
      }
    },
    handleBlur(e) {
      this.$emit('update:text', handleHtml(e.target.innerHTML))
      this.editing = false
    },
    handleFocus(e) {
      this.editing = true
    }
  }
}
</script>
