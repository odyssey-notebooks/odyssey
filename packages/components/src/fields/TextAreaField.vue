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

function handleNewlines(text) {
  text = text.replace(/<br>/g, '\n')
  text = text.replace(/<div>/g, '\n')
  text = text.replace(/```<\/?div>(.*?)<\/?div>```/g, '```\n$1\n```')
  text = text.replace(/<\/?div>/g, '')
  return text.replace(/\n\n\n+/g, '\n\n')
}

function handleHtml(html) {
  return handleNewlines(decode(html))
}

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
      this.$emit('update:text', handleHtml(e.target.innerHTML))
      this.editing = false
    },
    handleFocus(e) {
      this.editing = true
    }
  }
}
</script>
