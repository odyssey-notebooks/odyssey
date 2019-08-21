<template>
  <component :is="htmlTag" 
    class="font-bold" 
    :contenteditable="editable"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
    v-html="processedText"
  />
</template>

<script>
function italicsToHtml(text) {
  return text.replace(/([^\*]*)\*([^\*]*)\*([^\*]*)/g, '$1<i>$2</i>$3')
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
    htmlTag() {
      return 'h' + this.h  // default: h2
    },
    processedText() {
      // When not editing, replace "...*...*..." with "...<i>...</i>..."
      return !this.editing
        ? italicsToHtml(this.text)
        : this.text
    }
  },
  methods: {
    handleKeydown(e) {
      const enterKey = e.key === 'Enter'
      const forbiddenEdit = e.ctrlKey && ['u', 'b', 'i'].includes(e.key)
      const eventShouldBeIgnored = enterKey || forbiddenEdit
      if (eventShouldBeIgnored) {
        e.preventDefault()
      }
      if (enterKey) this.$el.blur()
    },
    handleBlur(e) {
      this.editing = false
      this.$emit('update:text', e.target.innerHTML)
    },
    handleFocus(e) {
      this.editing = true
    }
  }
}
</script>
