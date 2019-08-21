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
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const { decode } = entities;

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
      // When not editing, replace "...*...*..." with "...<i>...</i>..."
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
      let text = decode(e.target.innerHTML)
      text = text.replace(/<br>/g, '\n')
      text = text.replace(/<\/?div>/g, '')
      this.$emit('update:text', text)
      this.editing = false
    },
    handleFocus(e) {
      this.editing = true
    }
  }
}
</script>
