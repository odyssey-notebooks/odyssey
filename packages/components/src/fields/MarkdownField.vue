<template>
  <field class="markdown" :label="label">
    <div class="view-switcher" v-if="modeEditable">
      <button
        :class="{
          selected: currentMode === 'plaintext'
        }"
        @click="currentMode = 'plaintext'"
      >Plain Text</button>
      <button
        :class="{
          selected: currentMode === 'rendered'
        }"
        @click="currentMode = 'rendered'"
      >Rendered</button>
      <button
        :class="{
          selected: currentMode === 'sidebyside'
        }"
        @click="currentMode = 'sidebyside'"
      >Side By Side</button>
    </div>
    <div class="views">
      <text-area-widget
        v-if="showPlaintext"
        class="view plaintext"
        :value="originalText"
        :class="currentMode"
        :editable="editable"
        :tags="tags"
        @input="handleUnsavedText"
        @change="handleSavedText"
      />
      <markdown-pane
        v-if="showRendered"
        :value="renderedText"
        :class="currentMode"
      />
    </div>
  </field>
</template>

<script>
import Field from './Field.vue'
import TextAreaWidget from '../widgets/TextAreaWidget.vue'
import MarkdownPane from '../panes/MarkdownPane.vue'

export default {
  components: {
    Field,
    TextAreaWidget,
    MarkdownPane
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    editable: {
      type: Boolean,
      default: false
    },
    tags: {
      type: [Object, Array]
    },
    mode: {
      type: String,
      default: 'sidebyside',
      validator(val) {
        return ['plaintext', 'rendered', 'sidebyside'].includes(val)
      }
    },
    modeEditable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      originalText: this.value,
      renderedText: this.value,
      currentMode: this.mode
    }
  },
  computed: {
    showPlaintext() {
      return ['plaintext', 'sidebyside'].includes(this.currentMode)
    },
    showRendered() {
      return ['rendered', 'sidebyside'].includes(this.currentMode)
    }
  },
  methods: {
    handleUnsavedText(text) {
      this.renderedText = text
    },
    handleSavedText(text) {
      this.$emit('input', text)
    }
  }
}
</script>

<style scoped>
.views {
  display: flex;
  height: 50vh;
  margin-bottom: 2rem;
}
.text-area, .rendered-markdown {
  flex: 1 1 100%;
  overflow: auto;
}
.views .rendered-markdown {
  border: 1px solid rgba(0,0,0,0.2);
}
.sidebyside.text-area,
.sidebyside.rendered-markdown {
  max-width: 50%;
}
</style>
